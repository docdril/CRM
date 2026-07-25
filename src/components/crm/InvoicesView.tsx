'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Receipt, Plus, Download, CheckCircle, Clock, AlertTriangle, 
  Trash2, Eye, Edit3, Printer, Building, FileText, ChevronDown, Sparkles, X, ShieldCheck, Lock, Building2, Calculator, MessageSquare, Share2, QrCode, CreditCard, Copy, Check 
} from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { formatCurrency, formatFullCurrency } from '../../lib/utils';
import { Invoice, InvoiceItem, InvoiceStatus, Company } from '../../types/crm';

interface DraftInvoiceItem {
  id: string;
  description: string;
  hsnCode: string;
  quantity: number;
  unitPrice: number;
}

export const InvoicesView: React.FC = () => {
  const { 
    invoices, 
    createInvoice, 
    updateInvoice, 
    updateInvoiceStatus, 
    deleteInvoice, 
    currencySymbol, 
    setCurrencySymbol, 
    brandCustomization, 
    companies, 
    currentUser 
  } = useCrmStore();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  const isReadOnly = currentUser?.tabPermissions?.invoices === 'read';

  // Selected Client for Auto-Population
  const [selectedClientId, setSelectedClientId] = useState<string>(companies[0]?.id || '');
  const selectedCompany = companies.find(c => c.id === selectedClientId) || companies[0];

  // Invoice Number (Sequential Default + Editable)
  const defaultInvoiceNumber = `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`;
  const [invoiceNumberInput, setInvoiceNumberInput] = useState<string>(defaultInvoiceNumber);

  // Form Fields
  const [newCompanyName, setNewCompanyName] = useState(selectedCompany?.name || 'Apex Global Technologies');
  const [newCustomerGstin, setNewCustomerGstin] = useState(selectedCompany?.gstin || '27BBBBB1111B2Z4');
  const [newCustomerAddress, setNewCustomerAddress] = useState(selectedCompany?.address || '100 Montgomery St, Financial District, CA');
  const [newPlaceOfSupply, setNewPlaceOfSupply] = useState(selectedCompany?.placeOfSupply || '27-Maharashtra');
  const [newCustomerEmail, setNewCustomerEmail] = useState(selectedCompany?.email || 'billing@apexglobal.io');
  const [newCustomerPhone, setNewCustomerPhone] = useState(selectedCompany?.phone || '+91 98765 43210');
  const [newCustomerRepresentative, setNewCustomerRepresentative] = useState(
    selectedCompany?.authorizedRepresentative?.name ? `${selectedCompany.authorizedRepresentative.name} (${selectedCompany.authorizedRepresentative.role})` : 'Dr. Evelyn Reed (Chief Executive Officer)'
  );

  const [newGstTaxType, setNewGstTaxType] = useState<Company['gstTaxType']>(selectedCompany?.gstTaxType || 'cgst_sgst');
  const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatus>('pending');
  const [dueDate, setDueDate] = useState<string>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  // Bank & UPI Details State with Checkbox Toggles
  const [bankName, setBankName] = useState(brandCustomization.bankName || 'HDFC Bank Ltd');
  const [accountNumber, setAccountNumber] = useState(brandCustomization.accountNumber || '50200012345678');
  const [ifscCode, setIfscCode] = useState(brandCustomization.ifscCode || 'HDFC0000123');
  const [upiId, setUpiId] = useState('vertex@hdfcbank');
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [showUpiQr, setShowUpiQr] = useState(true);

  // Custom Notes & Thank You Message with Optional Checkbox Toggles
  const [customNotes, setCustomNotes] = useState<string>('Payment due within 30 days via NEFT / RTGS. Late payments subject to 1.5% monthly interest.');
  const [thankYouMessage, setThankYouMessage] = useState<string>('Thank you for your business! We greatly appreciate your partnership with Vertex.');
  const [includeTerms, setIncludeTerms] = useState(true);
  const [includeThankYou, setIncludeThankYou] = useState(true);

  // Dynamic Multi-Item Lines
  const [draftItems, setDraftItems] = useState<DraftInvoiceItem[]>([
    { id: '1', description: 'Enterprise Cloud License & Migration Suite', hsnCode: '998313', quantity: 1, unitPrice: 125000 },
    { id: '2', description: 'Annual SLA Maintenance & 24/7 AI Support', hsnCode: '998314', quantity: 1, unitPrice: 37500 }
  ]);

  // Sync client profile fields whenever selected client changes (only in Create mode)
  useEffect(() => {
    if (!editingInvoiceId && selectedCompany) {
      setNewCompanyName(selectedCompany.name);
      setNewCustomerGstin(selectedCompany.gstin || '27BBBBB1111B2Z4');
      setNewCustomerAddress(selectedCompany.address || '100 Montgomery St, Financial District, CA');
      setNewPlaceOfSupply(selectedCompany.placeOfSupply || '27-Maharashtra');
      setNewCustomerEmail(selectedCompany.email || 'billing@apexglobal.io');
      setNewCustomerPhone(selectedCompany.phone || '+91 98765 43210');
      setNewCustomerRepresentative(
        selectedCompany.authorizedRepresentative?.name 
          ? `${selectedCompany.authorizedRepresentative.name} (${selectedCompany.authorizedRepresentative.role})` 
          : 'Dr. Evelyn Reed (Chief Executive Officer)'
      );
      setNewGstTaxType(selectedCompany.gstTaxType || 'cgst_sgst');
    }
  }, [selectedClientId, selectedCompany, editingInvoiceId]);

  const handleOpenCreateModal = () => {
    if (isReadOnly) return;
    setEditingInvoiceId(null);
    setInvoiceNumberInput(`INV-2026-${String(invoices.length + 1).padStart(3, '0')}`);
    setDraftItems([
      { id: '1', description: 'Enterprise Cloud License & Migration Suite', hsnCode: '998313', quantity: 1, unitPrice: 125000 },
      { id: '2', description: 'Annual SLA Maintenance & 24/7 AI Support', hsnCode: '998314', quantity: 1, unitPrice: 37500 }
    ]);
    setInvoiceStatus('pending');
    setShowBankDetails(true);
    setShowUpiQr(true);
    setIncludeTerms(true);
    setIncludeThankYou(true);
    setCustomNotes('Payment due within 30 days via NEFT / RTGS. Late payments subject to 1.5% monthly interest.');
    setThankYouMessage('Thank you for your business! We greatly appreciate your partnership with Vertex.');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (inv: Invoice) => {
    if (isReadOnly) return;
    setEditingInvoiceId(inv.id);
    setInvoiceNumberInput(inv.invoiceNumber);
    setNewCompanyName(inv.companyName);
    setNewCustomerGstin(inv.customerGstin || '27BBBBB1111B2Z4');
    setNewCustomerAddress(inv.customerAddress || '100 Montgomery St, Financial District, CA');
    setNewPlaceOfSupply(inv.customerPlaceOfSupply || '27-Maharashtra');
    setNewCustomerEmail(inv.customerEmail || 'billing@apexglobal.io');
    setNewCustomerPhone(inv.customerPhone || '+91 98765 43210');
    setNewCustomerRepresentative(inv.customerRepresentative || 'Dr. Evelyn Reed (Chief Executive Officer)');
    setInvoiceStatus(inv.status);
    setDueDate(inv.dueDate);
    setCustomNotes(inv.customNotes || 'Payment due within 30 days via NEFT / RTGS.');
    setThankYouMessage(inv.thankYouMessage || 'Thank you for your business!');
    setShowBankDetails(inv.showBankDetails ?? true);
    setShowUpiQr(inv.showUpiQr ?? true);
    setIncludeTerms(inv.includeTerms ?? true);
    setIncludeThankYou(inv.includeThankYou ?? true);
    setBankName(inv.bankName || brandCustomization.bankName || 'HDFC Bank Ltd');
    setAccountNumber(inv.accountNumber || brandCustomization.accountNumber || '50200012345678');
    setIfscCode(inv.ifscCode || brandCustomization.ifscCode || 'HDFC0000123');
    setUpiId(inv.upiId || 'vertex@hdfcbank');

    if (inv.items && inv.items.length > 0) {
      setDraftItems(inv.items.map(item => ({
        id: item.id,
        description: item.description,
        hsnCode: item.hsnCode || '998313',
        quantity: item.quantity,
        unitPrice: item.unitPrice
      })));
    } else {
      setDraftItems([{ id: '1', description: 'Enterprise License', hsnCode: '998313', quantity: 1, unitPrice: inv.amount }]);
    }

    setIsModalOpen(true);
  };

  const handleAddItemRow = () => {
    setDraftItems([
      ...draftItems,
      { id: `item-${Date.now()}`, description: '', hsnCode: '998313', quantity: 1, unitPrice: 0 }
    ]);
  };

  const handleRemoveItemRow = (id: string) => {
    if (draftItems.length <= 1) return;
    setDraftItems(draftItems.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof DraftInvoiceItem, value: any) => {
    setDraftItems(draftItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Share Invoice Link Action
  const handleShareInvoice = (inv: Invoice) => {
    const url = `${window.location.origin}/?invoice=${inv.invoiceNumber}`;
    navigator.clipboard.writeText(url);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  // Automated Real-Time Tax Calculations
  const taxableSubtotal = draftItems.reduce((sum, item) => sum + (Number(item.quantity || 0) * Number(item.unitPrice || 0)), 0);
  
  let cgstVal = 0;
  let sgstVal = 0;
  let igstVal = 0;

  if (newGstTaxType === 'cgst_sgst') {
    cgstVal = taxableSubtotal * 0.09;
    sgstVal = taxableSubtotal * 0.09;
  } else if (newGstTaxType === 'igst') {
    igstVal = taxableSubtotal * 0.18;
  }

  const grandTotal = taxableSubtotal + cgstVal + sgstVal + igstVal;

  const filteredInvoices = invoices.filter(inv => filterStatus === 'all' || inv.status === filterStatus);

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((a, b) => a + b.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((a, b) => a + b.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((a, b) => a + b.amount, 0);

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly || draftItems.length === 0) return;

    const formattedItems: InvoiceItem[] = draftItems.map((item, idx) => ({
      id: item.id || `item-${idx}`,
      description: item.description || 'Enterprise Solution Line Item',
      hsnCode: item.hsnCode || '998313',
      quantity: Number(item.quantity) || 1,
      unitPrice: Number(item.unitPrice) || 0,
      amount: (Number(item.quantity) || 1) * (Number(item.unitPrice) || 0)
    }));

    if (editingInvoiceId) {
      updateInvoice(editingInvoiceId, {
        invoiceNumber: invoiceNumberInput || defaultInvoiceNumber,
        companyName: newCompanyName,
        customerGstin: newCustomerGstin,
        customerAddress: newCustomerAddress,
        customerPlaceOfSupply: newPlaceOfSupply,
        customerEmail: newCustomerEmail,
        customerPhone: newCustomerPhone,
        customerRepresentative: newCustomerRepresentative,
        amount: grandTotal,
        totalTaxableAmount: taxableSubtotal,
        cgstAmount: cgstVal,
        sgstAmount: sgstVal,
        igstAmount: igstVal,
        status: invoiceStatus,
        dueDate,
        customNotes,
        thankYouMessage,
        showBankDetails,
        showUpiQr,
        includeTerms,
        includeThankYou,
        bankName,
        accountNumber,
        ifscCode,
        upiId,
        items: formattedItems
      });
    } else {
      createInvoice({
        invoiceNumber: invoiceNumberInput || defaultInvoiceNumber,
        companyId: selectedCompany?.id || 'comp-1',
        companyName: newCompanyName,
        customerGstin: newCustomerGstin,
        customerAddress: newCustomerAddress,
        customerPlaceOfSupply: newPlaceOfSupply,
        customerEmail: newCustomerEmail,
        customerPhone: newCustomerPhone,
        customerRepresentative: newCustomerRepresentative,
        amount: grandTotal,
        totalTaxableAmount: taxableSubtotal,
        cgstAmount: cgstVal,
        sgstAmount: sgstVal,
        igstAmount: igstVal,
        status: invoiceStatus,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate,
        customNotes,
        thankYouMessage,
        showBankDetails,
        showUpiQr,
        includeTerms,
        includeThankYou,
        bankName,
        accountNumber,
        ifscCode,
        upiId,
        items: formattedItems
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-[1700px] mx-auto font-outfit">
      {/* Strict Read Only Notice */}
      {isReadOnly && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl flex items-center gap-2 text-xs font-bold font-outfit">
          <Lock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Strict Read-Only Mode Enabled: You can view tax invoices, but creating or editing invoices is locked.</span>
        </div>
      )}

      {/* Top Header & Currency Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display">Invoices & GST Tax Billing</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
              GST Multi-Item Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise multi-item billing generator with automated CGST/SGST/IGST tax calculation
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold shadow-2xs">
            <span className="text-slate-400 font-normal">Currency:</span>
            <select
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              className="bg-transparent font-extrabold text-slate-900 focus:outline-none cursor-pointer font-display"
            >
              <option value="₹">₹ INR (Rupee Default)</option>
              <option value="$">$ USD (US Dollar)</option>
              <option value="€">€ EUR (Euro)</option>
              <option value="£">£ GBP (Pound)</option>
            </select>
          </div>

          {!isReadOnly && (
            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all btn-spring shadow-sm flex items-center gap-1.5 font-display"
            >
              <Plus className="w-4 h-4" /> Create GST Tax Invoice
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Paid Invoices</span>
            <p className="text-2xl font-black text-emerald-600 mt-1 font-display">{formatCurrency(totalPaid, currencySymbol)}</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Pending Collection</span>
            <p className="text-2xl font-black text-amber-600 mt-1 font-display">{formatCurrency(totalPending, currencySymbol)}</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-soft flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Overdue Receivables</span>
            <p className="text-2xl font-black text-rose-600 mt-1 font-display">{formatCurrency(totalOverdue, currencySymbol)}</p>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Status Filter Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200/80 rounded-2xl w-fit shadow-2xs font-display">
        {['all', 'paid', 'pending', 'overdue', 'draft'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 text-xs font-extrabold rounded-xl uppercase transition-all ${
              filterStatus === st
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Invoices Table with Interactive Status Select Dropdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200/80 font-display text-slate-700 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Company Account</th>
              <th className="p-4">Customer GSTIN</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status Controller</th>
              <th className="p-4">Issue Date</th>
              <th className="p-4">Due Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-bold text-slate-900 font-display">{inv.invoiceNumber}</td>
                <td className="p-4 font-semibold text-slate-800">{inv.companyName}</td>
                <td className="p-4 font-mono text-[11px] text-slate-500">{inv.customerGstin || '27AAAAA0000A1Z5'}</td>
                <td className="p-4 font-black text-slate-900 font-display">{formatFullCurrency(inv.amount, currencySymbol)}</td>
                <td className="p-4">
                  {/* Interactive Status Controller Dropdown */}
                  {!isReadOnly ? (
                    <select
                      value={inv.status}
                      onChange={(e) => updateInvoiceStatus(inv.id, e.target.value as InvoiceStatus)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase focus:outline-none cursor-pointer border ${
                        inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        inv.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        inv.status === 'overdue' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <option value="paid">PAID</option>
                      <option value="pending">PENDING</option>
                      <option value="overdue">OVERDUE</option>
                      <option value="draft">DRAFT</option>
                    </select>
                  ) : (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      inv.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {inv.status}
                    </span>
                  )}
                </td>
                <td className="p-4 text-slate-500 font-semibold">{inv.issueDate}</td>
                <td className="p-4 text-slate-500 font-semibold">{inv.dueDate}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-xl text-xs font-bold transition-all btn-spring flex items-center gap-1 font-display"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>

                    <button
                      onClick={() => handleShareInvoice(inv)}
                      className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="Shareable Client Invoice Link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {!isReadOnly && (
                      <button
                        onClick={() => handleOpenEditModal(inv)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Invoice Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}

                    {!isReadOnly && (
                      <button
                        onClick={() => deleteInvoice(inv.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete Invoice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Share Toast Confirmation */}
      {copiedShareLink && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 font-outfit text-xs font-bold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Shareable Invoice Link Copied to Clipboard!</span>
        </div>
      )}

      {/* Authentic Real-World GST Tax Invoice PDF Viewer Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md font-outfit">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Action Bar (Hidden during window.print()) */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 no-print">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-brand-400" />
                <span className="font-bold text-sm font-display">Tax Invoice Document — {selectedInvoice.invoiceNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareInvoice(selectedInvoice)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-brand-300" /> Share Link
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 font-display"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Export PDF
                </button>
                <button onClick={() => setSelectedInvoice(null)} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Authentic Invoice Body */}
            <div id="printable-invoice" className="p-8 overflow-y-auto space-y-6 text-slate-900 bg-white">
              {/* Header: Brand Logo & Company GST Details */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-6">
                <div className="space-y-2">
                  {brandCustomization.logoUrl ? (
                    <img src={brandCustomization.logoUrl} alt="Logo" className="w-12 h-12 rounded-xl object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-lg font-display">
                      VX
                    </div>
                  )}
                  <h2 className="text-xl font-black font-display tracking-tight text-slate-900">{brandCustomization.appName}</h2>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{brandCustomization.registeredAddress}</p>
                  <p className="text-xs font-mono text-slate-700 font-semibold">Vendor GSTIN: <span className="font-bold">{brandCustomization.gstNumber}</span></p>
                </div>

                <div className="text-right space-y-1">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-extrabold uppercase">
                    TAX INVOICE
                  </span>
                  <p className="text-sm font-black font-display text-slate-900 pt-2">{selectedInvoice.invoiceNumber}</p>
                  <p className="text-xs text-slate-500">Date: {selectedInvoice.issueDate}</p>
                  <p className="text-xs text-slate-500">Due: {selectedInvoice.dueDate}</p>
                </div>
              </div>

              {/* Complete BILLED TO (CUSTOMER) Card with Representative, Address, Email, Phone & Place of Supply */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between text-xs font-outfit">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">BILLED TO (CUSTOMER)</span>
                  <h4 className="text-base font-extrabold font-display text-slate-900">{selectedInvoice.companyName}</h4>
                  
                  {selectedInvoice.customerRepresentative && (
                    <p className="text-xs font-bold text-slate-700">
                      Attn: <span className="text-slate-900">{selectedInvoice.customerRepresentative}</span>
                    </p>
                  )}

                  <p className="text-slate-600 font-medium">
                    {selectedInvoice.customerAddress || '100 Montgomery St, Financial District, CA'}
                  </p>

                  <p className="text-slate-500 text-[11px]">
                    Email: <span className="font-semibold text-brand-600">{selectedInvoice.customerEmail || 'billing@apexglobal.io'}</span>
                    {' • '}
                    Phone: <span className="font-semibold text-slate-800">{selectedInvoice.customerPhone || '+91 98765 43210'}</span>
                  </p>
                </div>

                <div className="text-right space-y-2 shrink-0">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">CUSTOMER GSTIN</span>
                    <p className="font-mono font-bold text-slate-900 text-xs mt-0.5">{selectedInvoice.customerGstin || '27BBBBB1111B2Z4'}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">PLACE OF SUPPLY</span>
                    <p className="font-bold text-slate-900 text-xs mt-0.5">{selectedInvoice.customerPlaceOfSupply || '27-Maharashtra'}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Multi-Line Items Table */}
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 font-display text-slate-700 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3">HSN/SAC</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Rate</th>
                    <th className="p-3 text-right">Taxable Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-outfit">
                  {(selectedInvoice.items && selectedInvoice.items.length > 0 ? selectedInvoice.items : [
                    { id: '1', description: 'Enterprise Software License & AI Suite', hsnCode: '998313', quantity: 1, unitPrice: selectedInvoice.amount * 0.84, amount: selectedInvoice.amount * 0.84 }
                  ]).map((item) => (
                    <tr key={item.id}>
                      <td className="p-3 font-bold text-slate-900">{item.description}</td>
                      <td className="p-3 font-mono text-slate-500">{item.hsnCode || '998313'}</td>
                      <td className="p-3 text-center font-bold">{item.quantity}</td>
                      <td className="p-3 text-right font-semibold">{formatCurrency(item.unitPrice, currencySymbol)}</td>
                      <td className="p-3 text-right font-extrabold text-slate-900">{formatCurrency(item.amount, currencySymbol)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Tax Calculations & Totals */}
              <div className="flex justify-end pt-2">
                <div className="w-72 space-y-2 text-xs font-outfit">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-semibold">Subtotal (Taxable):</span>
                    <span className="font-bold text-slate-900">{formatCurrency(selectedInvoice.totalTaxableAmount || selectedInvoice.amount * 0.84, currencySymbol)}</span>
                  </div>
                  {selectedInvoice.igstAmount ? (
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">IGST (18%):</span>
                      <span className="font-bold text-slate-700">{formatCurrency(selectedInvoice.igstAmount, currencySymbol)}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-semibold">CGST (9%):</span>
                        <span className="font-bold text-slate-700">{formatCurrency(selectedInvoice.cgstAmount || selectedInvoice.amount * 0.08, currencySymbol)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-semibold">SGST (9%):</span>
                        <span className="font-bold text-slate-700">{formatCurrency(selectedInvoice.sgstAmount || selectedInvoice.amount * 0.08, currencySymbol)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-display font-black text-slate-900">
                    <span>Total Amount Payable:</span>
                    <span>{formatFullCurrency(selectedInvoice.amount, currencySymbol)}</span>
                  </div>
                </div>
              </div>

              {/* Bank & UPI Payment Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-outfit pt-2">
                {selectedInvoice.showBankDetails !== false && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-900 font-display flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-brand-600" /> Bank Remittance Details:
                    </p>
                    <p className="text-slate-600 mt-1">Bank: <strong className="text-slate-900 font-bold">{selectedInvoice.bankName || brandCustomization.bankName || 'HDFC Bank Ltd'}</strong></p>
                    <p className="text-slate-600">A/C #: <strong className="text-slate-900 font-mono font-bold">{selectedInvoice.accountNumber || brandCustomization.accountNumber || '50200012345678'}</strong></p>
                    <p className="text-slate-600">IFSC: <strong className="text-slate-900 font-mono font-bold">{selectedInvoice.ifscCode || brandCustomization.ifscCode || 'HDFC0000123'}</strong></p>
                  </div>
                )}

                {selectedInvoice.showUpiQr !== false && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 font-display flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-emerald-600" /> Instant UPI Payment VPA:
                      </p>
                      <p className="text-xs font-mono font-bold text-brand-600 mt-1">{selectedInvoice.upiId || 'vertex@hdfcbank'}</p>
                      <p className="text-[10px] text-slate-400 font-medium">Scan QR code or copy VPA ID to pay</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center p-1 text-center shrink-0">
                      <QrCode className="w-7 h-7 text-slate-800" />
                    </div>
                  </div>
                )}
              </div>

              {/* Custom Terms Notes & Optional Thank-You Message */}
              {(selectedInvoice.includeTerms !== false || selectedInvoice.includeThankYou !== false) && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3 font-outfit">
                  {selectedInvoice.includeTerms !== false && (
                    <div>
                      <p className="font-bold text-slate-900 font-display">Terms & Payment Notes:</p>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        {selectedInvoice.customNotes || 'Payment due within 30 days via NEFT / RTGS. Late payments subject to 1.5% monthly interest.'}
                      </p>
                    </div>
                  )}

                  {selectedInvoice.includeThankYou !== false && (
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-brand-700 font-bold font-display">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>{selectedInvoice.thankYouMessage || 'Thank you for your business! We greatly appreciate your partnership with Vertex.'}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Authorized Signatory</p>
                        <p className="font-extrabold text-slate-900 font-display">Vertex Finance Operations</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit GST Tax Invoice Modal */}
      {!isReadOnly && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-outfit overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-100">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {editingInvoiceId ? 'Edit GST Tax Invoice' : 'Create Multi-Item GST Tax Invoice'}
                  </h3>
                  <p className="text-xs text-slate-500">Configure sequential invoice #, bank/UPI details, and optional messages</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInvoice} className="space-y-4 text-xs">
              {/* Section 1: Invoice Number & Client Selection */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-display">
                      Invoice Number (Sequential & Editable)
                    </label>
                    <input
                      type="text"
                      required
                      value={invoiceNumberInput}
                      onChange={(e) => setInvoiceNumberInput(e.target.value)}
                      placeholder="e.g. INV-2026-001 or TAX-INV/2026/089"
                      className="w-full mt-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-display flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-brand-600" /> Customer Account
                    </label>
                    <select
                      value={selectedClientId}
                      onChange={(e) => setSelectedClientId(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                    >
                      {companies.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} — GSTIN: {c.gstin || '27AAAAA0000A1Z5'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Invoice Status</label>
                    <select
                      value={invoiceStatus}
                      onChange={(e) => setInvoiceStatus(e.target.value as InvoiceStatus)}
                      className="w-full mt-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                    >
                      <option value="pending">PENDING</option>
                      <option value="paid">PAID</option>
                      <option value="overdue">OVERDUE</option>
                      <option value="draft">DRAFT</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">Payment Due Date</label>
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Bank Details & UPI VPA Controls */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] font-display text-brand-600 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Bank Account & UPI VPA Payment Details
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Bank Name</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Account Number</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">IFSC Code</label>
                    <input
                      type="text"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700">UPI Payment VPA ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. vertex@hdfcbank"
                    className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-brand-600"
                  />
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showBankDetails}
                      onChange={(e) => setShowBankDetails(e.target.checked)}
                      className="w-4 h-4 text-brand-600 rounded cursor-pointer"
                    />
                    <span>Show Bank Details on Invoice</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showUpiQr}
                      onChange={(e) => setShowUpiQr(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                    />
                    <span>Show UPI Payment ID & QR Code</span>
                  </label>
                </div>
              </div>

              {/* Section 3: Dynamic Multi-Line Items Builder */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-display">
                    Invoice Line Items ({draftItems.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-[11px] rounded-xl transition-colors flex items-center gap-1 font-display"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Line Item
                  </button>
                </div>

                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {draftItems.map((item, index) => (
                    <div key={item.id} className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-2">
                      <div className="w-6 text-center font-bold text-slate-400 text-xs font-display">
                        #{index + 1}
                      </div>

                      <div className="flex-1 grid grid-cols-5 gap-2">
                        <div className="col-span-2">
                          <input
                            type="text"
                            required
                            placeholder="Item description..."
                            value={item.description}
                            onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            required
                            placeholder="HSN"
                            value={item.hsnCode}
                            onChange={(e) => handleUpdateItem(item.id, 'hsnCode', e.target.value)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold"
                          />
                        </div>

                        <div>
                          <input
                            type="number"
                            required
                            min="1"
                            placeholder="Qty"
                            value={item.quantity}
                            onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-center"
                          />
                        </div>

                        <div>
                          <input
                            type="number"
                            required
                            min="0"
                            placeholder="Unit Rate"
                            value={item.unitPrice}
                            onChange={(e) => handleUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-right font-display"
                          />
                        </div>
                      </div>

                      {draftItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItemRow(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove Line Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Optional Notes & Thank You Message Checkboxes */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-display flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-600" /> Optional Terms Notes & Thank You Message
                </label>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeTerms}
                        onChange={(e) => setIncludeTerms(e.target.checked)}
                        className="w-4 h-4 text-brand-600 rounded cursor-pointer"
                      />
                      <span>Include Custom Payment Terms & Notes</span>
                    </label>
                    {includeTerms && (
                      <input
                        type="text"
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        placeholder="e.g. Payment due within 30 days via NEFT / RTGS..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                      />
                    )}
                  </div>

                  <div className="space-y-1 pt-1">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeThankYou}
                        onChange={(e) => setIncludeThankYou(e.target.checked)}
                        className="w-4 h-4 text-brand-600 rounded cursor-pointer"
                      />
                      <span>Include Thank You / Closing Message</span>
                    </label>
                    {includeThankYou && (
                      <input
                        type="text"
                        value={thankYouMessage}
                        onChange={(e) => setThankYouMessage(e.target.value)}
                        placeholder="e.g. Thank you for your business! We appreciate your partnership with Vertex."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Real-time Tax Breakdown Bar */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1.5">
                <div className="flex justify-between text-xs font-outfit">
                  <span className="text-slate-400">Taxable Subtotal:</span>
                  <span className="font-bold text-white font-display">{formatCurrency(taxableSubtotal, currencySymbol)}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-white/10">
                  <span className="font-extrabold text-white text-xs uppercase font-display">Grand Total Payable:</span>
                  <span className="text-lg font-black text-brand-300 font-display">{formatFullCurrency(grandTotal, currencySymbol)}</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 text-white font-black text-xs rounded-xl hover:bg-slate-800 font-display shadow-md btn-spring"
                >
                  {editingInvoiceId ? 'Save Invoice Changes' : 'Generate Tax Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
