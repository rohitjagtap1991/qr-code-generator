// Simple Internationalization System
// Language translations for QR Code Generator

const translations = {
    en: {
        // Header
        title: "Free QR Code Generator",
        subtitle: "Create custom QR codes instantly. 100% free.",

        // Input Section
        inputLabel: "Enter Text or URL",
        inputPlaceholder: "https://example.com or any text...",
        characters: "characters",

        // Content Type
        contentTypeLabel: "Content Type",
        typeText: "📝 Plain Text / URL",
        typeWifi: "📶 WiFi Network",
        typeVCard: "👤 Contact Card (vCard)",
        typeEmail: "📧 Email",
        typePhone: "📞 Phone Number",
        typeSMS: "💬 SMS Message",

        // WiFi Form
        wifiSSIDLabel: "Network Name (SSID)",
        wifiSSIDPlaceholder: "MyWiFiNetwork",
        wifiPasswordLabel: "Password",
        wifiPasswordPlaceholder: "Enter WiFi password",
        wifiEncryptionLabel: "Security Type",
        wifiHiddenLabel: "Hidden Network",

        // vCard Form
        vcardNameLabel: "Full Name",
        vcardNamePlaceholder: "John Doe",
        vcardPhoneLabel: "Phone Number",
        vcardPhonePlaceholder: "+1234567890",
        vcardEmailLabel: "Email Address",
        vcardEmailPlaceholder: "john@example.com",
        vcardCompanyLabel: "Company (optional)",
        vcardCompanyPlaceholder: "Company Name",
        vcardURLLabel: "Website (optional)",
        vcardURLPlaceholder: "https://example.com",

        // Email Form
        emailToLabel: "Email Address",
        emailToPlaceholder: "recipient@example.com",
        emailSubjectLabel: "Subject (optional)",
        emailSubjectPlaceholder: "Email subject",
        emailBodyLabel: "Message (optional)",
        emailBodyPlaceholder: "Email message...",

        // Phone Form
        phoneNumberLabel: "Phone Number",
        phoneNumberPlaceholder: "+1234567890",
        phoneNumberHint: "Include country code (e.g., +1 for US)",

        // SMS Form
        smsNumberLabel: "Phone Number",
        smsNumberPlaceholder: "+1234567890",
        smsMessageLabel: "Message (optional)",
        smsMessagePlaceholder: "Pre-filled SMS message...",

        // Size & Format
        sizeLabel: "QR Code Size",
        sizeSmall: "Small (256x256)",
        sizeMedium: "Medium (512x512)",
        sizeLarge: "Large (1024x1024)",
        sizeXLarge: "Extra Large (2048x2048)",

        formatLabel: "Download Format",

        // Colors
        fgColorLabel: "Foreground Color",
        bgColorLabel: "Background Color",

        // Buttons
        generateBtn: "Generate QR Code",
        downloadBtn: "Download QR Code",
        copyBtn: "Copy to Clipboard",
        clearBtn: "Clear",

        // History
        historyTitle: "Recent QR Codes",

        // Preview
        previewTitle: "Preview",
        previewPlaceholder: "Your QR code will appear here",

        // How to Use Section
        howToTitle: "How to Use the QR Code Generator",
        howToStep1: "<strong>Enter your content:</strong> Type any text, URL, phone number, or other information into the text field.",
        howToStep2: "<strong>Customize appearance:</strong> Choose size, colors, and download format according to your needs.",
        howToStep3: "<strong>Generate:</strong> Click the \"Generate QR Code\" button to create your custom QR code.",
        howToStep4: "<strong>Download:</strong> Click \"Download QR Code\" to save it to your device in PNG or SVG format.",

        // Features Section
        featuresTitle: "Features",
        feature1Title: "⚡ Instant Generation",
        feature1Desc: "Create QR codes in seconds with real-time preview.",
        feature2Title: "🎨 Customizable Colors",
        feature2Desc: "Choose any foreground and background colors to match your brand.",
        feature3Title: "📱 High Resolution",
        feature3Desc: "Download QR codes up to 2048x2048 pixels for print quality.",
        feature4Title: "🔒 Privacy First",
        feature4Desc: "All processing happens in your browser. No data is sent to any server.",
        feature5Title: "💾 Multiple Formats",
        feature5Desc: "Download as PNG for images or SVG for scalable vector graphics.",
        feature6Title: "💯 100% Free",
        feature6Desc: "No signup, no watermarks, no limitations. Completely free forever.",

        // FAQ Section
        faqTitle: "Frequently Asked Questions",

        faq1Q: "What is a QR code?",
        faq1A: "A QR (Quick Response) code is a two-dimensional barcode that can store various types of data like URLs, text, phone numbers, email addresses, and more. QR codes can be scanned using smartphone cameras or dedicated QR code readers.",

        faq2Q: "Is this QR code generator really free?",
        faq2A: "Yes! This tool is completely free to use with no hidden costs, signup requirements, or usage limitations. You can generate as many QR codes as you need.",

        faq3Q: "Are my QR codes stored on your servers?",
        faq3A: "No. All QR code generation happens entirely in your browser using JavaScript. We don't store, collect, or transmit any of your data to our servers. Your privacy is fully protected.",

        faq4Q: "What can I encode in a QR code?",
        faq4A: "You can encode any text, URLs, contact information (vCard), WiFi credentials, email addresses, phone numbers, SMS messages, and more. The maximum capacity is approximately 1,800 characters. For shorter texts (under 800 characters), the QR code uses high error correction for better scanning reliability.",

        faq5Q: "Can I use custom colors for my QR code?",
        faq5A: "Yes! You can customize both the foreground (dark) and background (light) colors. However, ensure sufficient contrast between colors for reliable scanning.",

        faq6Q: "What's the difference between PNG and SVG formats?",
        faq6A: "PNG is a raster image format best for digital use and sharing on websites. SVG is a vector format that can be scaled infinitely without quality loss, making it ideal for printing and professional design work.",

        faq7Q: "Do QR codes expire?",
        faq7A: "Static QR codes (like the ones generated here) never expire. They will work forever as long as the encoded content remains valid. The QR code itself contains all the information needed.",

        faq8Q: "Can I print my QR code?",
        faq8A: "Absolutely! For best print quality, use the largest size option (2048x2048) or download as SVG format. Ensure the QR code is at least 2x2 cm (0.8x0.8 inches) when printed for reliable scanning.",

        // Footer
        footerRights: "All rights reserved.",
        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms of Service",
        footerMade: "Made with ❤️ for the internet",

        // Alerts/Messages
        errorEmpty: "Please enter some text or URL to generate QR code",
        errorTooLong: "Text is too long. Maximum 1,800 characters allowed.",
        errorSameColor: "Foreground and background colors cannot be the same!",
        errorGenerate: "Failed to generate QR code. Text might be too long or complex. Try reducing the length.",
        errorDownload: "Please generate a QR code first",
        successDownload: "QR code downloaded successfully!",

        // Language Switcher
        language: "Language",
        langEnglish: "English",
        langSpanish: "Español"
    },

    es: {
        // Header
        title: "Generador de Códigos QR Gratis",
        subtitle: "Crea códigos QR personalizados al instante. 100% gratis.",

        // Input Section
        inputLabel: "Ingresa Texto o URL",
        inputPlaceholder: "https://ejemplo.com o cualquier texto...",
        characters: "caracteres",

        // Content Type
        contentTypeLabel: "Tipo de Contenido",
        typeText: "📝 Texto Simple / URL",
        typeWifi: "📶 Red WiFi",
        typeVCard: "👤 Tarjeta de Contacto (vCard)",
        typeEmail: "📧 Correo Electrónico",
        typePhone: "📞 Número de Teléfono",
        typeSMS: "💬 Mensaje SMS",

        // WiFi Form
        wifiSSIDLabel: "Nombre de Red (SSID)",
        wifiSSIDPlaceholder: "MiRedWiFi",
        wifiPasswordLabel: "Contraseña",
        wifiPasswordPlaceholder: "Ingresa contraseña WiFi",
        wifiEncryptionLabel: "Tipo de Seguridad",
        wifiHiddenLabel: "Red Oculta",

        // vCard Form
        vcardNameLabel: "Nombre Completo",
        vcardNamePlaceholder: "Juan Pérez",
        vcardPhoneLabel: "Número de Teléfono",
        vcardPhonePlaceholder: "+1234567890",
        vcardEmailLabel: "Correo Electrónico",
        vcardEmailPlaceholder: "juan@ejemplo.com",
        vcardCompanyLabel: "Empresa (opcional)",
        vcardCompanyPlaceholder: "Nombre de Empresa",
        vcardURLLabel: "Sitio Web (opcional)",
        vcardURLPlaceholder: "https://ejemplo.com",

        // Email Form
        emailToLabel: "Correo Electrónico",
        emailToPlaceholder: "destinatario@ejemplo.com",
        emailSubjectLabel: "Asunto (opcional)",
        emailSubjectPlaceholder: "Asunto del correo",
        emailBodyLabel: "Mensaje (opcional)",
        emailBodyPlaceholder: "Mensaje del correo...",

        // Phone Form
        phoneNumberLabel: "Número de Teléfono",
        phoneNumberPlaceholder: "+1234567890",
        phoneNumberHint: "Incluye código de país (ej., +1 para EE.UU.)",

        // SMS Form
        smsNumberLabel: "Número de Teléfono",
        smsNumberPlaceholder: "+1234567890",
        smsMessageLabel: "Mensaje (opcional)",
        smsMessagePlaceholder: "Mensaje SMS prellenado...",

        // Size & Format
        sizeLabel: "Tamaño del Código QR",
        sizeSmall: "Pequeño (256x256)",
        sizeMedium: "Mediano (512x512)",
        sizeLarge: "Grande (1024x1024)",
        sizeXLarge: "Extra Grande (2048x2048)",

        formatLabel: "Formato de Descarga",

        // Colors
        fgColorLabel: "Color Principal",
        bgColorLabel: "Color de Fondo",

        // Buttons
        generateBtn: "Generar Código QR",
        downloadBtn: "Descargar Código QR",
        copyBtn: "Copiar al Portapapeles",
        clearBtn: "Limpiar",

        // History
        historyTitle: "Códigos QR Recientes",

        // Preview
        previewTitle: "Vista Previa",
        previewPlaceholder: "Tu código QR aparecerá aquí",

        // How to Use Section
        howToTitle: "Cómo Usar el Generador de Códigos QR",
        howToStep1: "<strong>Ingresa tu contenido:</strong> Escribe cualquier texto, URL, número de teléfono u otra información en el campo de texto.",
        howToStep2: "<strong>Personaliza la apariencia:</strong> Elige el tamaño, colores y formato de descarga según tus necesidades.",
        howToStep3: "<strong>Genera:</strong> Haz clic en el botón \"Generar Código QR\" para crear tu código QR personalizado.",
        howToStep4: "<strong>Descarga:</strong> Haz clic en \"Descargar Código QR\" para guardarlo en tu dispositivo en formato PNG o SVG.",

        // Features Section
        featuresTitle: "Características",
        feature1Title: "⚡ Generación Instantánea",
        feature1Desc: "Crea códigos QR en segundos con vista previa en tiempo real.",
        feature2Title: "🎨 Colores Personalizables",
        feature2Desc: "Elige cualquier color principal y de fondo para que coincida con tu marca.",
        feature3Title: "📱 Alta Resolución",
        feature3Desc: "Descarga códigos QR de hasta 2048x2048 píxeles para calidad de impresión.",
        feature4Title: "🔒 Privacidad Primero",
        feature4Desc: "Todo el procesamiento ocurre en tu navegador. No se envían datos a ningún servidor.",
        feature5Title: "💾 Múltiples Formatos",
        feature5Desc: "Descarga como PNG para imágenes o SVG para gráficos vectoriales escalables.",
        feature6Title: "💯 100% Gratis",
        feature6Desc: "Sin registro, sin marcas de agua, sin limitaciones. Completamente gratis para siempre.",

        // FAQ Section
        faqTitle: "Preguntas Frecuentes",

        faq1Q: "¿Qué es un código QR?",
        faq1A: "Un código QR (Respuesta Rápida) es un código de barras bidimensional que puede almacenar varios tipos de datos como URLs, texto, números de teléfono, direcciones de correo electrónico y más. Los códigos QR se pueden escanear usando cámaras de teléfonos inteligentes o lectores de códigos QR dedicados.",

        faq2Q: "¿Este generador de códigos QR es realmente gratis?",
        faq2A: "¡Sí! Esta herramienta es completamente gratuita sin costos ocultos, requisitos de registro o limitaciones de uso. Puedes generar tantos códigos QR como necesites.",

        faq3Q: "¿Mis códigos QR se almacenan en sus servidores?",
        faq3A: "No. Toda la generación de códigos QR ocurre completamente en tu navegador usando JavaScript. No almacenamos, recopilamos ni transmitimos ninguno de tus datos a nuestros servidores. Tu privacidad está completamente protegida.",

        faq4Q: "¿Qué puedo codificar en un código QR?",
        faq4A: "Puedes codificar cualquier texto, URLs, información de contacto (vCard), credenciales WiFi, direcciones de correo electrónico, números de teléfono, mensajes SMS y más. La capacidad máxima es de aproximadamente 1,800 caracteres. Para textos más cortos (menos de 800 caracteres), el código QR usa corrección de errores alta para mejor confiabilidad de escaneo.",

        faq5Q: "¿Puedo usar colores personalizados para mi código QR?",
        faq5A: "¡Sí! Puedes personalizar tanto el color principal (oscuro) como el color de fondo (claro). Sin embargo, asegúrate de tener suficiente contraste entre los colores para un escaneo confiable.",

        faq6Q: "¿Cuál es la diferencia entre los formatos PNG y SVG?",
        faq6A: "PNG es un formato de imagen rasterizada mejor para uso digital y compartir en sitios web. SVG es un formato vectorial que se puede escalar infinitamente sin pérdida de calidad, lo que lo hace ideal para impresión y trabajo de diseño profesional.",

        faq7Q: "¿Los códigos QR expiran?",
        faq7A: "Los códigos QR estáticos (como los generados aquí) nunca expiran. Funcionarán para siempre siempre que el contenido codificado permanezca válido. El código QR en sí contiene toda la información necesaria.",

        faq8Q: "¿Puedo imprimir mi código QR?",
        faq8A: "¡Absolutamente! Para la mejor calidad de impresión, usa la opción de tamaño más grande (2048x2048) o descarga en formato SVG. Asegúrate de que el código QR tenga al menos 2x2 cm al imprimirse para un escaneo confiable.",

        // Footer
        footerRights: "Todos los derechos reservados.",
        footerPrivacy: "Política de Privacidad",
        footerTerms: "Términos de Servicio",
        footerMade: "Hecho con ❤️ para internet",

        // Alerts/Messages
        errorEmpty: "Por favor ingresa texto o URL para generar el código QR",
        errorTooLong: "El texto es demasiado largo. Máximo 1,800 caracteres permitidos.",
        errorSameColor: "¡Los colores principal y de fondo no pueden ser iguales!",
        errorGenerate: "Error al generar el código QR. El texto podría ser demasiado largo o complejo. Intenta reducir la longitud.",
        errorDownload: "Por favor genera un código QR primero",
        successDownload: "¡Código QR descargado exitosamente!",

        // Language Switcher
        language: "Idioma",
        langEnglish: "English",
        langSpanish: "Español"
    }
};

// i18n Class
class I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.translations = translations;
    }

    detectLanguage() {
        // Check localStorage first
        const savedLang = localStorage.getItem('qr-lang');
        if (savedLang && translations[savedLang]) {
            return savedLang;
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('es')) {
            return 'es';
        }

        return 'en'; // Default to English
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('qr-lang', lang);
            this.updatePage();

            // Update HTML lang attribute
            document.documentElement.lang = lang;

            // Update meta description
            this.updateMetaTags();
        }
    }

    t(key) {
        return this.translations[this.currentLang][key] || this.translations.en[key] || key;
    }

    updatePage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                }
            } else {
                element.innerHTML = translation;
            }
        });

        // Update select options
        document.querySelectorAll('[data-i18n-option]').forEach(option => {
            const key = option.getAttribute('data-i18n-option');
            option.textContent = this.t(key);
        });

        // Update character counter text
        const charCountElement = document.querySelector('.char-count');
        if (charCountElement) {
            const count = document.getElementById('char-count').textContent;
            charCountElement.innerHTML = `<span id="char-count">${count}</span> / 1800 ${this.t('characters')}`;
        }

        // Update language selector
        document.querySelectorAll('.lang-option').forEach(option => {
            if (option.getAttribute('data-lang') === this.currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    updateMetaTags() {
        const titles = {
            en: 'Free QR Code Generator - Create Custom QR Codes Online',
            es: 'Generador de Códigos QR Gratis - Crear Códigos QR Personalizados'
        };

        const descriptions = {
            en: 'Generate free QR codes instantly. Create custom QR codes with colors, logos, and download in PNG or SVG format. No signup required. 100% free online QR code generator.',
            es: 'Genera códigos QR gratis al instante. Crea códigos QR personalizados con colores y descarga en formato PNG o SVG. Sin registro. Generador de códigos QR 100% gratis.'
        };

        document.title = titles[this.currentLang];

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', descriptions[this.currentLang]);
        }
    }
}

// Initialize i18n
const i18n = new I18n();

// Make it globally available
window.i18n = i18n;
