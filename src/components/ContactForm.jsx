import { useState } from 'react';

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
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simular envío del formulario
            // En producción, aquí harías la llamada a tu API/servicio de email
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Datos del formulario:', formData);

            // Simular éxito
            setSubmitStatus('success');

            // Limpiar formulario
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
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre y Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre completo *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                            placeholder="Tu nombre completo"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                            placeholder="tu@email.com"
                        />
                    </div>
                </div>

                {/* Teléfono y Asunto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                            placeholder="+34 123 456 789"
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Asunto *
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                        >
                            <option value="">Selecciona un tema</option>
                            <option value="info-general">Información general</option>
                            <option value="unirse-comparsa">Unirse a la comparsa</option>
                            <option value="eventos">Consulta sobre eventos</option>
                            <option value="colaboracion">Propuesta de colaboración</option>
                            <option value="medios">Medios de comunicación</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                </div>

                {/* Interés específico */}
                <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                        ¿En qué estás más interesado?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { value: 'musica', label: '🎵 Música' },
                            { value: 'baile', label: '💃 Baile' },
                            { value: 'vestuario', label: '👗 Vestuario' },
                            { value: 'organizacion', label: '📋 Organización' }
                        ].map(option => (
                            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="interest"
                                    value={option.value}
                                    checked={formData.interest === option.value}
                                    onChange={handleChange}
                                    className="text-black focus:ring-black"
                                />
                                <span className="text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Mensaje */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-vertical"
                        placeholder="Cuéntanos más sobre tu consulta o interés..."
                    />
                </div>

                {/* Estado del envío */}
                {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-green-800 font-medium">¡Mensaje enviado correctamente!</p>
                        </div>
                        <p className="text-green-700 text-sm mt-1">
                            Nos pondremos en contacto contigo lo antes posible.
                        </p>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <p className="text-red-800 font-medium">Error al enviar el mensaje</p>
                        </div>
                        <p className="text-red-700 text-sm mt-1">
                            Por favor, inténtalo de nuevo o contacta con nosotros directamente.
                        </p>
                    </div>
                )}

                {/* Botón de envío */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enviando...
                            </>
                        ) : (
                            'Enviar Mensaje'
                        )}
                    </button>
                </div>

                {/* Información adicional */}
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        * Campos obligatorios. Responderemos en un plazo máximo de 48 horas.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;