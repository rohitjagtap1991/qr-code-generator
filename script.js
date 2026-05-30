// QR Code Generator - Main JavaScript
// All processing happens client-side for privacy

class QRCodeGenerator {
    constructor() {
        // DOM Elements - Content Type
        this.contentTypeSelect = document.getElementById('content-type');
        this.tabButtons = document.querySelectorAll('.tab-btn');

        // DOM Elements - Forms
        this.textForm = document.getElementById('text-form');
        this.wifiForm = document.getElementById('wifi-form');
        this.vcardForm = document.getElementById('vcard-form');
        this.emailForm = document.getElementById('email-form');
        this.phoneForm = document.getElementById('phone-form');
        this.smsForm = document.getElementById('sms-form');

        // DOM Elements - WiFi form inputs
        this.wifiSSID = document.getElementById('wifi-ssid');
        this.wifiPassword = document.getElementById('wifi-password');
        this.wifiEncryption = document.getElementById('wifi-encryption');
        this.wifiHidden = document.getElementById('wifi-hidden');

        // DOM Elements - vCard form inputs
        this.vcardName = document.getElementById('vcard-name');
        this.vcardPhone = document.getElementById('vcard-phone');
        this.vcardEmail = document.getElementById('vcard-email');
        this.vcardCompany = document.getElementById('vcard-company');
        this.vcardURL = document.getElementById('vcard-url');

        // DOM Elements - Email form inputs
        this.emailTo = document.getElementById('email-to');
        this.emailSubject = document.getElementById('email-subject');
        this.emailBody = document.getElementById('email-body');

        // DOM Elements - Phone form input
        this.phoneNumber = document.getElementById('phone-number');

        // DOM Elements - SMS form inputs
        this.smsNumber = document.getElementById('sms-number');
        this.smsMessage = document.getElementById('sms-message');

        // DOM Elements - Text inputs
        this.textInput = document.getElementById('qr-text');
        this.sizeSelect = document.getElementById('qr-size');
        this.formatSelect = document.getElementById('qr-format');
        this.fgColorInput = document.getElementById('fg-color');
        this.bgColorInput = document.getElementById('bg-color');
        this.fgColorText = document.getElementById('fg-color-text');
        this.bgColorText = document.getElementById('bg-color-text');
        this.charCount = document.getElementById('char-count');
        this.generateBtn = document.getElementById('generate-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.copyBtn = document.getElementById('copy-btn');
        this.clearBtn = document.getElementById('clear-btn');
        this.qrContainer = document.getElementById('qr-code-container');

        // DOM Elements - History
        this.historySection = document.getElementById('history-section');
        this.historyList = document.getElementById('history-list');

        // State
        this.currentQRCode = null;
        this.currentCanvas = null;
        this.currentData = null;

        // Initialize
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.updateCharCount();
        this.updateColorText();
        this.switchContentType(); // Initialize form visibility
        if (this.historySection) this.loadHistory(); // Load history if element exists
    }

    attachEventListeners() {
        // Content type selector (legacy dropdown support)
        if (this.contentTypeSelect) {
            this.contentTypeSelect.addEventListener('change', () => this.switchContentType());
        }

        // Tab buttons (new UI)
        if (this.tabButtons) {
            this.tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all tabs
                    this.tabButtons.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked tab
                    btn.classList.add('active');
                    // Switch content type
                    this.switchContentType(btn.dataset.type);
                });
            });
        }

        // Generate button
        this.generateBtn.addEventListener('click', () => this.generateQRCode());

        // Download button
        this.downloadBtn.addEventListener('click', () => this.downloadQRCode());

        // Copy button
        if (this.copyBtn) {
            this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        }

        // Clear button
        this.clearBtn.addEventListener('click', () => this.clearAll());

        // Character counter
        this.textInput.addEventListener('input', () => this.updateCharCount());

        // Color inputs - update text display when picker changes
        this.fgColorInput.addEventListener('input', () => this.updateColorText());
        this.bgColorInput.addEventListener('input', () => this.updateColorText());

        // Text inputs - validate as user types
        this.fgColorText.addEventListener('input', () => this.validateColorInput('fg'));
        this.bgColorText.addEventListener('input', () => this.validateColorInput('bg'));

        // Text inputs - finalize on blur (expand shorthand, update picker)
        this.fgColorText.addEventListener('blur', () => this.finalizeColorInput('fg'));
        this.bgColorText.addEventListener('blur', () => this.finalizeColorInput('bg'));

        // Text inputs - finalize on Enter key
        this.fgColorText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.finalizeColorInput('fg');
                this.fgColorText.blur();
            }
        });
        this.bgColorText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.finalizeColorInput('bg');
                this.bgColorText.blur();
            }
        });

        // Enter key to generate
        this.textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateQRCode();
            }
        });

        // Auto-regenerate on option change (if QR already exists)
        [this.sizeSelect, this.fgColorInput, this.bgColorInput].forEach(element => {
            element.addEventListener('change', () => {
                if (this.currentQRCode && this.textInput.value.trim()) {
                    this.generateQRCode();
                }
            });
        });
    }

    updateCharCount() {
        const length = this.textInput.value.length;
        this.charCount.textContent = length;

        // Visual feedback for character limit
        if (length > 1600) {
            this.charCount.style.color = '#ef4444'; // Red - approaching limit
        } else if (length > 1200) {
            this.charCount.style.color = '#f59e0b'; // Orange - warning
        } else {
            this.charCount.style.color = '#64748b'; // Gray - normal
        }
    }

    updateColorText() {
        this.fgColorText.value = this.fgColorInput.value.toUpperCase();
        this.bgColorText.value = this.bgColorInput.value.toUpperCase();
    }

    validateColorInput(type) {
        const textInput = type === 'fg' ? this.fgColorText : this.bgColorText;
        const colorInput = type === 'fg' ? this.fgColorInput : this.bgColorInput;

        let value = textInput.value.trim().toUpperCase();

        // Auto-add # if missing
        if (value.length > 0 && !value.startsWith('#')) {
            value = '#' + value;
            textInput.value = value;
        }

        // Validate hex pattern (allow partial input while typing)
        const validPartialHex = /^#([0-9A-Fa-f]{0,6})$/;
        const validCompleteHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

        if (validCompleteHex.test(value)) {
            // Valid complete hex (3 or 6 digits)
            textInput.style.borderColor = '';
            textInput.style.color = '';

            // Only update picker for 6-digit hex (don't expand 3-digit yet)
            if (value.length === 7) {
                colorInput.value = value.toLowerCase();

                // Auto-regenerate if QR exists
                if (this.currentQRCode && this.textInput.value.trim()) {
                    this.generateQRCode();
                }
            }
        } else if (validPartialHex.test(value)) {
            // Valid but incomplete - no error styling
            textInput.style.borderColor = '';
            textInput.style.color = '';
        } else {
            // Invalid hex - show error
            textInput.style.borderColor = '#ef4444';
            textInput.style.color = '#ef4444';
        }
    }

    finalizeColorInput(type) {
        const textInput = type === 'fg' ? this.fgColorText : this.bgColorText;
        const colorInput = type === 'fg' ? this.fgColorInput : this.bgColorInput;

        let value = textInput.value.trim().toUpperCase();

        // Auto-add # if missing
        if (value.length > 0 && !value.startsWith('#')) {
            value = '#' + value;
        }

        // Validate and expand if needed
        const validCompleteHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

        if (validCompleteHex.test(value)) {
            // Expand 3-digit hex to 6-digit (#ABC -> #AABBCC)
            if (value.length === 4) {
                value = '#' + value[1] + value[1] + value[2] + value[2] + value[3] + value[3];
            }

            textInput.value = value.toUpperCase();
            colorInput.value = value.toLowerCase();

            // Remove error styling
            textInput.style.borderColor = '';
            textInput.style.color = '';

            // Auto-regenerate if QR exists
            if (this.currentQRCode && this.textInput.value.trim()) {
                this.generateQRCode();
            }
        } else if (value.length > 1) {
            // Invalid - revert to current picker value
            textInput.value = colorInput.value.toUpperCase();
            textInput.style.borderColor = '';
            textInput.style.color = '';
        }
    }

    switchContentType(type = null) {
        // Get type from parameter (tab click) or dropdown (legacy)
        const contentType = type || (this.contentTypeSelect ? this.contentTypeSelect.value : 'text');

        // Hide all forms
        const forms = [this.textForm, this.wifiForm, this.vcardForm, this.emailForm, this.phoneForm, this.smsForm];
        forms.forEach(form => {
            if (form) form.style.display = 'none';
        });

        // Show selected form
        const formMap = {
            'text': this.textForm,
            'wifi': this.wifiForm,
            'vcard': this.vcardForm,
            'email': this.emailForm,
            'phone': this.phoneForm,
            'sms': this.smsForm
        };

        const selectedForm = formMap[contentType];
        if (selectedForm) {
            selectedForm.style.display = 'flex';
        }
    }

    getQRData() {
        if (!this.contentTypeSelect) {
            const textData = this.textInput.value.trim();
            if (!textData) {
                this.showError(window.i18n.t('errorEmpty'));
                return null;
            }
            return textData;
        }

        const type = this.contentTypeSelect.value;

        switch (type) {
            case 'text':
                const textData = this.textInput.value.trim();
                if (!textData) {
                    this.showError(window.i18n.t('errorEmpty'));
                    return null;
                }
                return textData;

            case 'wifi':
                if (!this.wifiSSID || !this.wifiSSID.value.trim()) {
                    this.showError(window.i18n.t('errorWifiSSID'));
                    return null;
                }
                const ssid = this.wifiSSID.value.trim();
                const password = this.wifiPassword ? this.wifiPassword.value : '';
                const encryption = this.wifiEncryption ? this.wifiEncryption.value : 'WPA';
                const hidden = this.wifiHidden ? this.wifiHidden.checked : false;

                let wifiString = `WIFI:S:${ssid};T:${encryption};`;
                if (encryption !== 'nopass' && password) {
                    wifiString += `P:${password};`;
                }
                if (hidden) {
                    wifiString += 'H:true;';
                }
                wifiString += ';';
                return wifiString;

            case 'vcard':
                const name = this.vcardName ? this.vcardName.value.trim() : '';
                const phone = this.vcardPhone ? this.vcardPhone.value.trim() : '';
                const email = this.vcardEmail ? this.vcardEmail.value.trim() : '';
                const company = this.vcardCompany ? this.vcardCompany.value.trim() : '';
                const url = this.vcardURL ? this.vcardURL.value.trim() : '';

                if (!name && !phone && !email) {
                    this.showError(window.i18n.t('errorVCardInfo'));
                    return null;
                }

                let vcard = 'BEGIN:VCARD\n';
                vcard += 'VERSION:3.0\n';
                if (name) vcard += `FN:${name}\n`;
                if (phone) vcard += `TEL:${phone}\n`;
                if (email) vcard += `EMAIL:${email}\n`;
                if (company) vcard += `ORG:${company}\n`;
                if (url) vcard += `URL:${url}\n`;
                vcard += 'END:VCARD';
                return vcard;

            case 'email':
                const emailTo = this.emailTo ? this.emailTo.value.trim() : '';
                if (!emailTo) {
                    this.showError(window.i18n.t('errorEmailAddress'));
                    return null;
                }
                const subject = this.emailSubject ? this.emailSubject.value.trim() : '';
                const body = this.emailBody ? this.emailBody.value.trim() : '';

                let mailto = `mailto:${emailTo}`;
                const params = [];
                if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
                if (body) params.push(`body=${encodeURIComponent(body)}`);
                if (params.length > 0) {
                    mailto += '?' + params.join('&');
                }
                return mailto;

            case 'phone':
                const phoneNum = this.phoneNumber ? this.phoneNumber.value.trim() : '';
                if (!phoneNum) {
                    this.showError(window.i18n.t('errorPhoneNumber'));
                    return null;
                }
                return `tel:${phoneNum}`;

            case 'sms':
                const smsNum = this.smsNumber ? this.smsNumber.value.trim() : '';
                if (!smsNum) {
                    this.showError(window.i18n.t('errorPhoneNumber'));
                    return null;
                }
                const message = this.smsMessage ? this.smsMessage.value.trim() : '';
                let sms = `SMSTO:${smsNum}`;
                if (message) {
                    sms += `:${message}`;
                }
                return sms;

            default:
                const defaultData = this.textInput.value.trim();
                if (!defaultData) {
                    this.showError(window.i18n.t('errorEmpty'));
                    return null;
                }
                return defaultData;
        }
    }

    generateFilename(format) {
        const text = this.textInput.value.trim();

        // Generate human-readable date (YYYY-MM-DD-HHMMSS)
        const now = new Date();
        const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
        const time = now.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS

        // Detect content type
        let contentType = 'qr';
        let cleanText = '';

        if (text.match(/^https?:\/\//i)) {
            contentType = 'url';
            // Extract domain from URL
            try {
                const url = new URL(text);
                cleanText = url.hostname.replace(/^www\./, '');
            } catch (e) {
                cleanText = text.substring(0, 30);
            }
        } else if (text.match(/^mailto:/i)) {
            contentType = 'email';
            cleanText = text.replace(/^mailto:/i, '').split('?')[0];
        } else if (text.match(/^tel:/i)) {
            contentType = 'phone';
            cleanText = text.replace(/^tel:/i, '');
        } else if (text.match(/^WIFI:/i)) {
            contentType = 'wifi';
            const ssidMatch = text.match(/S:([^;]+)/);
            cleanText = ssidMatch ? ssidMatch[1] : 'network';
        } else {
            contentType = 'text';
            // Take first meaningful words (up to 30 chars)
            cleanText = text.substring(0, 30);
        }

        // Clean the text: alphanumeric + hyphens, replace spaces/special with hyphens
        cleanText = cleanText
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphens
            .replace(/^-+|-+$/g, '')       // Trim hyphens from start/end
            .replace(/-{2,}/g, '-');       // Replace multiple hyphens with single

        // Limit length to avoid filesystem issues
        if (cleanText.length > 40) {
            cleanText = cleanText.substring(0, 40).replace(/-+$/, '');
        }

        // Fallback if cleaning resulted in empty string
        if (!cleanText) {
            cleanText = 'qrcode';
        }

        // Format: {type}-{content}-{date}-{time}.{format}
        // Example: url-example-com-2026-05-28-143022.png
        return `${contentType}-${cleanText}-${date}-${time}.${format}`;
    }

    generateQRCode() {
        const data = this.getQRData();

        // Validation
        if (!data) {
            return; // Error already shown in getQRData()
        }

        if (data.length > 1800) {
            this.showError(window.i18n.t('errorTooLong'));
            return;
        }

        // Store current data for re-generation and history
        this.currentData = data;

        // Show loading state
        this.generateBtn.classList.add('loading');
        this.generateBtn.disabled = true;

        // Small delay to show loading animation
        setTimeout(() => {
            try {
                this.createQRCode(data);
                this.downloadBtn.disabled = false;
                if (this.copyBtn) this.copyBtn.disabled = false;
                this.generateBtn.classList.remove('loading');
                this.generateBtn.disabled = false;

                // Save to history
                this.saveToHistory();
            } catch (error) {
                console.error('QR Code generation error:', error);
                this.showError(window.i18n.t('errorGenerate'));
                this.generateBtn.classList.remove('loading');
                this.generateBtn.disabled = false;
            }
        }, 300);
    }

    createQRCode(text) {
        // Clear existing QR code
        this.qrContainer.innerHTML = '';

        // Get options
        const size = parseInt(this.sizeSelect.value);
        const fgColor = this.fgColorInput.value;
        const bgColor = this.bgColorInput.value;

        // Validate color contrast (basic check)
        if (fgColor.toLowerCase() === bgColor.toLowerCase()) {
            this.showError(window.i18n.t('errorSameColor'));
            return;
        }

        // Dynamic error correction based on text length
        // H (High): Best quality, ~1000 chars max
        // M (Medium): Good quality, ~1500 chars max  
        // L (Low): Basic quality, ~1800 chars max
        let errorCorrectionLevel;
        if (text.length <= 800) {
            errorCorrectionLevel = QRCode.CorrectLevel.H; // High (30% recovery)
        } else if (text.length <= 1400) {
            errorCorrectionLevel = QRCode.CorrectLevel.M; // Medium (15% recovery)
        } else {
            errorCorrectionLevel = QRCode.CorrectLevel.L; // Low (7% recovery)
        }

        // Create wrapper div with quiet zone (ISO/IEC 18004 standard)
        // Quiet zone should be at least 4 modules wide
        const wrapper = document.createElement('div');
        wrapper.className = 'qr-code-wrapper';

        // Calculate quiet zone based on QR code size (approximately 4 modules)
        // Standard QR codes have ~21-177 modules per side depending on version
        // We use ~6% of size as padding for proper quiet zone
        const quietZone = Math.max(16, Math.floor(size * 0.06));
        wrapper.style.padding = `${quietZone}px`;

        const qrDiv = document.createElement('div');
        qrDiv.style.display = 'inline-block';
        wrapper.appendChild(qrDiv);
        this.qrContainer.appendChild(wrapper);

        // Generate QR Code using qrcode.js library
        this.currentQRCode = new QRCode(qrDiv, {
            text: text,
            width: size,
            height: size,
            colorDark: fgColor,
            colorLight: bgColor,
            correctLevel: errorCorrectionLevel
        });

        // Store canvas reference for download
        setTimeout(() => {
            this.currentCanvas = qrDiv.querySelector('canvas');

            // Track analytics (optional - you can add Google Analytics event here)
            this.trackGeneration();
        }, 100);
    }

    downloadQRCode() {
        if (!this.currentCanvas) {
            this.showError(window.i18n.t('errorDownload'));
            return;
        }

        const format = this.formatSelect.value;
        const filename = this.generateFilename(format);

        if (format === 'png') {
            this.downloadPNG(filename);
        } else if (format === 'svg') {
            this.downloadSVG(filename);
        }

        // Track download (optional - Google Analytics)
        this.trackDownload(format);
    }

    downloadPNG(filename) {
        // Create a new canvas with quiet zone included
        const originalSize = parseInt(this.sizeSelect.value);
        const quietZone = Math.max(16, Math.floor(originalSize * 0.06));
        const totalSize = originalSize + (quietZone * 2);

        const canvas = document.createElement('canvas');
        canvas.width = totalSize;
        canvas.height = totalSize;
        const ctx = canvas.getContext('2d');

        // Fill with white background (quiet zone)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, totalSize, totalSize);

        // Draw the QR code in the center
        ctx.drawImage(this.currentCanvas, quietZone, quietZone);

        // Convert to blob and download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            this.showSuccess(window.i18n.t('successDownload'));
        }, 'image/png');
    }

    downloadSVG(filename) {
        // Create canvas with quiet zone for SVG export
        const originalSize = parseInt(this.sizeSelect.value);
        const quietZone = Math.max(16, Math.floor(originalSize * 0.06));
        const totalSize = originalSize + (quietZone * 2);

        const canvas = document.createElement('canvas');
        canvas.width = totalSize;
        canvas.height = totalSize;
        const ctx = canvas.getContext('2d');

        // Fill with white background (quiet zone)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, totalSize, totalSize);

        // Draw the QR code in the center
        ctx.drawImage(this.currentCanvas, quietZone, quietZone);

        const img = canvas.toDataURL('image/png');

        // Create SVG wrapper around the image with quiet zone
        const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="${totalSize}" height="${totalSize}" viewBox="0 0 ${totalSize} ${totalSize}">
    <rect width="${totalSize}" height="${totalSize}" fill="white"/>
    <image width="${totalSize}" height="${totalSize}" xlink:href="${img}"/>
</svg>`;

        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showSuccess(window.i18n.t('successDownload'));
    }

    async copyToClipboard() {
        if (!this.currentCanvas) {
            return;
        }

        try {
            this.currentCanvas.toBlob(async (blob) => {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            'image/png': blob
                        })
                    ]);
                    this.showSuccess(window.i18n.t('successCopy'));
                } catch (err) {
                    console.error('Failed to copy:', err);
                    this.showError(window.i18n.t('errorCopyFailed'));
                }
            });
        } catch (err) {
            console.error('Failed to copy:', err);
            this.showError(window.i18n.t('errorCopyFailed'));
        }
    }

    saveToHistory() {
        if (!this.historySection || !this.currentData) return;

        const type = this.contentTypeSelect ? this.contentTypeSelect.value : 'text';
        let preview = '';

        switch (type) {
            case 'text':
                preview = this.currentData.substring(0, 50);
                break;
            case 'wifi':
                const ssidMatch = this.currentData.match(/S:([^;]+)/);
                preview = `WiFi: ${ssidMatch ? ssidMatch[1] : 'Network'}`;
                break;
            case 'vcard':
                const nameMatch = this.currentData.match(/FN:([^\n]+)/);
                preview = `Contact: ${nameMatch ? nameMatch[1] : 'Card'}`;
                break;
            case 'email':
                const emailMatch = this.currentData.match(/mailto:([^?]+)/);
                preview = `Email: ${emailMatch ? emailMatch[1] : ''}`;
                break;
            case 'phone':
                preview = `Phone: ${this.currentData.replace('tel:', '')}`;
                break;
            case 'sms':
                const smsMatch = this.currentData.match(/SMSTO:([^:]+)/);
                preview = `SMS: ${smsMatch ? smsMatch[1] : ''}`;
                break;
            default:
                preview = this.currentData.substring(0, 50);
        }

        const historyItem = {
            type: type,
            preview: preview,
            data: this.currentData,
            timestamp: Date.now()
        };

        let history = JSON.parse(localStorage.getItem('qr-history') || '[]');
        history.unshift(historyItem);
        history = history.slice(0, 10);
        localStorage.setItem('qr-history', JSON.stringify(history));

        this.renderHistory();
    }

    loadHistory() {
        this.renderHistory();
    }

    renderHistory() {
        if (!this.historySection || !this.historyList) return;

        const history = JSON.parse(localStorage.getItem('qr-history') || '[]');

        if (history.length === 0) {
            this.historySection.style.display = 'none';
            return;
        }

        this.historySection.style.display = 'block';
        this.historyList.innerHTML = '';

        const typeLabels = {
            'text': 'Text/URL',
            'wifi': 'WiFi',
            'vcard': 'Contact',
            'email': 'Email',
            'phone': 'Phone',
            'sms': 'SMS'
        };

        history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';

            historyItem.innerHTML = `
                <div class="history-item-content">
                    <div class="history-item-type">${typeLabels[item.type] || 'QR Code'}</div>
                    <div class="history-item-preview">${item.preview}</div>
                </div>
                <button class="history-item-delete" data-index="${index}" title="Delete">×</button>
            `;

            historyItem.querySelector('.history-item-content').addEventListener('click', () => {
                this.loadFromHistory(item);
            });

            historyItem.querySelector('.history-item-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteFromHistory(index);
            });

            this.historyList.appendChild(historyItem);
        });
    }

    loadFromHistory(item) {
        this.currentData = item.data;
        this.createQRCode(item.data);
        this.downloadBtn.disabled = false;
        if (this.copyBtn) this.copyBtn.disabled = false;
    }

    deleteFromHistory(index) {
        let history = JSON.parse(localStorage.getItem('qr-history') || '[]');
        history.splice(index, 1);
        localStorage.setItem('qr-history', JSON.stringify(history));
        this.renderHistory();
    }

    clearAll() {
        // Clear text form
        this.textInput.value = '';

        // Clear WiFi form
        if (this.wifiSSID) this.wifiSSID.value = '';
        if (this.wifiPassword) this.wifiPassword.value = '';
        if (this.wifiEncryption) this.wifiEncryption.value = 'WPA';
        if (this.wifiHidden) this.wifiHidden.checked = false;

        // Clear vCard form
        if (this.vcardName) this.vcardName.value = '';
        if (this.vcardPhone) this.vcardPhone.value = '';
        if (this.vcardEmail) this.vcardEmail.value = '';
        if (this.vcardCompany) this.vcardCompany.value = '';
        if (this.vcardURL) this.vcardURL.value = '';

        // Clear email form
        if (this.emailTo) this.emailTo.value = '';
        if (this.emailSubject) this.emailSubject.value = '';
        if (this.emailBody) this.emailBody.value = '';

        // Clear phone form
        if (this.phoneNumber) this.phoneNumber.value = '';

        // Clear SMS form
        if (this.smsNumber) this.smsNumber.value = '';
        if (this.smsMessage) this.smsMessage.value = '';

        // Reset QR display
        this.qrContainer.innerHTML = `
            <div class="placeholder">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                    <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                    <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                    <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                </svg>
                <p>Your QR code will appear here</p>
            </div>
        `;
        this.currentQRCode = null;
        this.currentCanvas = null;
        this.currentData = null;
        this.downloadBtn.disabled = true;
        if (this.copyBtn) this.copyBtn.disabled = true;
        this.updateCharCount();
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showSuccess(message) {
        this.showToast(message, 'success');
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');

        // Icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <div class="toast-content">${message}</div>
            <button class="toast-close" aria-label="Close notification" title="Close">
                <span>×</span>
            </button>
        `;

        // Add to container
        container.appendChild(toast);

        // Close button handler
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.removeToast(toast);
        });

        // Auto dismiss after 4 seconds (longer for errors)
        const duration = type === 'error' ? 5000 : 4000;
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);
    }

    removeToast(toast) {
        if (!toast || !toast.parentElement) return;

        toast.classList.add('toast-exit');

        // Remove from DOM after animation
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 200);
    }

    trackGeneration() {
        // Google Analytics tracking (optional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'generate_qr_code', {
                'event_category': 'QR_Code',
                'event_label': 'Generated'
            });
        }
    }

    trackDownload(format) {
        // Google Analytics tracking (optional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download_qr_code', {
                'event_category': 'QR_Code',
                'event_label': format.toUpperCase()
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if QRCode library is loaded
    if (typeof QRCode === 'undefined') {
        console.error('QRCode library not loaded!');
        alert('Error: QR Code library failed to load. Please refresh the page or check your internet connection.');
        return;
    }

    // Initialize the QR Code Generator
    const generator = new QRCodeGenerator();

    // Add some helpful tips in console for developers
    console.log('%c🔲 QR Code Generator', 'font-size: 20px; font-weight: bold; color: #4f46e5;');
    console.log('%cAll QR code generation happens in your browser. Your data never leaves your device.', 'color: #10b981;');
    console.log('%cKeyboard shortcut: Ctrl+Enter to generate QR code', 'color: #64748b;');
});

// Initialize i18n system on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update page with detected/saved language
    window.i18n.updatePage();

    // Set active state on current language button
    const currentLang = window.i18n.currentLanguage;
    document.querySelectorAll('.lang-option').forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
    });

    // Add click handlers for language switching
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            window.i18n.setLanguage(lang);
        });
    });
});
