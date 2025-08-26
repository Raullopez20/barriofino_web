import { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        interest: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});

    // Configuración de EmailJS - Reemplaza con tus propios IDs
    const EMAILJS_SERVICE_ID = 'service_yr7xdu8';
    const EMAILJS_TEMPLATE_ID = 'template_kvqxnmu';
    const EMAILJS_PUBLIC_KEY = 'R0ePa6OQMQCqpZWnO';

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'El formato del email no es válido';
        }

        if (!formData.subject) {
            newErrors.subject = 'Selecciona un asunto';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'El mensaje es obligatorio';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Para integrar EmailJS, descomenta esto y configura tus credenciales:
            /*
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone || 'No proporcionado',
                subject: formData.subject,
                message: formData.message,
                interest: formData.interest || 'No especificado',
                to_name: 'Peña BarrioFino',
                reply_to: formData.email
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );
            */

            // Simulación temporal - eliminar cuando uses EmailJS real
            await new Promise(resolve => setTimeout(resolve, 2000));

            setSubmitStatus('success');

            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                interest: ''
            });

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

                {/* Header del formulario */}
                <div className="text-center border-b border-gray-100 pb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Envíanos un Mensaje</h3>
                    <p className="text-gray-600">Completa el formulario y te responderemos lo antes posible</p>
                </div>

                {/* Nombre y Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            Nombre completo *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                                errors.name
                                    ? 'border-red-300 bg-red-50 focus:border-red-400'
                                    : 'border-gray-200 focus:border-gray-900 bg-gray-50 focus:bg-white'
                            }`}
                            placeholder="Tu nombre completo"
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            Correo electrónico *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                                errors.email
                                    ? 'border-red-300 bg-red-50 focus:border-red-400'
                                    : 'border-gray-200 focus:border-gray-900 bg-gray-50 focus:bg-white'
                            }`}
                            placeholder="tu@email.com"
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                {errors.email}
                            </p>
                        )}
                    </div>
                </div>

                {/* Teléfono y Asunto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 focus:bg-white"
                            placeholder="+34 123 456 789"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                            </svg>
                            Asunto *
                        </label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${
                                errors.subject
                                    ? 'border-red-300 bg-red-50 focus:border-red-400'
                                    : 'border-gray-200 focus:border-gray-900 bg-gray-50 focus:bg-white'
                            }`}
                        >
                            <option value="">Selecciona un tema</option>
                            <option value="info-general">Información general</option>
                            <option value="unirse-comparsa">Unirse a la peña</option>
                            <option value="eventos">Consulta sobre eventos</option>
                            <option value="colaboracion">Propuesta de colaboración</option>
                            <option value="medios">Medios de comunicación</option>
                            <option value="otro">Otro</option>
                        </select>
                        {errors.subject && (
                            <p className="text-red-600 text-sm flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                {errors.subject}
                            </p>
                        )}
                    </div>
                </div>

                {/* Interés específico */}
                <div className="space-y-4">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                        ¿En qué estás más interesado?
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { value: 'musica', label: 'Música', icon: '🎵' },
                            { value: 'baile', label: 'Baile', icon: '💃' },
                            { value: 'vestuario', label: 'Vestuario', icon: '👗' },
                            { value: 'organizacion', label: 'Organización', icon: '📋' }
                        ].map(option => (
                            <label key={option.value} className="relative cursor-pointer group">
                                <input
                                    type="radio"
                                    name="interest"
                                    value={option.value}
                                    checked={formData.interest === option.value}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <div className={`p-4 rounded-xl border-2 transition-all duration-300 text-center group-hover:shadow-md ${
                                    formData.interest === option.value
                                        ? 'border-gray-900 bg-gray-900 text-white shadow-lg'
                                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                                }`}>
                                    <div className="text-2xl mb-2">{option.icon}</div>
                                    <div className="text-sm font-medium">{option.label}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Mensaje */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        Mensaje *
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900/20 resize-vertical ${
                            errors.message
                                ? 'border-red-300 bg-red-50 focus:border-red-400'
                                : 'border-gray-200 focus:border-gray-900 bg-gray-50 focus:bg-white'
                        }`}
                        placeholder="Cuéntanos más sobre tu consulta o interés..."
                    />
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <div>
                            {errors.message && (
                                <span className="text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {errors.message}
                                </span>
                            )}
                        </div>
                        <div className={formData.message.length >= 10 ? 'text-green-600' : ''}>
                            {formData.message.length}/10 min
                        </div>
                    </div>
                </div>

                {/* Estado del envío */}
                {submitStatus === 'success' && (
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl animate-pulse">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-green-800 font-semibold text-lg">¡Mensaje enviado correctamente!</p>
                                <p className="text-green-700 text-sm">
                                    Nos pondremos en contacto contigo en las próximas 48 horas.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl animate-pulse">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-red-800 font-semibold text-lg">Error al enviar el mensaje</p>
                                <p className="text-red-700 text-sm">
                                    Por favor, inténtalo de nuevo o contacta con nosotros directamente.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Botón de envío */}
                <div className="text-center pt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="group relative bg-gradient-to-r from-gray-900 to-gray-700 text-white px-12 py-4 rounded-xl hover:from-gray-800 hover:to-gray-600 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <div className="relative flex items-center">
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando mensaje...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                                    </svg>
                                    Enviar Mensaje
                                </>
                            )}
                        </div>
                    </button>
                </div>

                {/* Información adicional */}
                <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        * Campos obligatorios. Responderemos en un plazo máximo de 48 horas.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        Tus datos están protegidos y no serán compartidos con terceros.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ContactForm;
