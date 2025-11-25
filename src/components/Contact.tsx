import React, { useState } from 'react';
import { Mail, FileText, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // In a real app, this would trigger a serverless function
    };

    return (
        <section className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Left Column: Info & Resume */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-4">Let's streamline your production.</h2>
                        <p className="text-slate-400">
                            Whether you need a custom Business Central integration, a Power BI audit, or a desktop automation bot, I'm ready to discuss your bottlenecks.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <FileText className="text-teal-500" size={20} />
                            Resume & Documents
                        </h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded hover:border-teal-500/50 transition-colors text-left group">
                                <div>
                                    <div className="text-slate-200 font-medium group-hover:text-teal-400">Download Full CV (PDF)</div>
                                    <div className="text-xs text-slate-500">Includes certifications & project timeline</div>
                                </div>
                                <FileText className="text-slate-600 group-hover:text-teal-400" size={18} />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded hover:border-teal-500/50 transition-colors text-left group">
                                <div>
                                    <div className="text-slate-200 font-medium group-hover:text-teal-400">Technical Case Study</div>
                                    <div className="text-xs text-slate-500">Deep dive into PyAutoGUI + ERP architecture</div>
                                </div>
                                <FileText className="text-slate-600 group-hover:text-teal-400" size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Mail size={16} />
                        <span>gokusahin@gmail.com</span>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                    {submitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-in min-h-[400px]">
                            <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-teal-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Message Received</h3>
                            <p className="text-slate-400 max-w-xs">
                                I'll check your requirements and get back to you within 24 hours with a demo slot.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-teal-400 hover:text-teal-300 text-sm font-medium mt-4"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="text-xl font-bold text-white mb-6">Request a Demo</h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400">Name</label>
                                    <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400">Company</label>
                                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder="Acme Mfg." />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Email</label>
                                <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Interest</label>
                                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors appearance-none">
                                    <option>Power BI Dashboard Demo</option>
                                    <option>ERP Automation Consultation</option>
                                    <option>General Inquiry</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Message</label>
                                <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 transition-colors" placeholder="Tell me about your current production bottlenecks..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-4 rounded-lg flex items-center justify-center transition-colors">
                                <Send className="w-4 h-4 mr-2" />
                                Send Request
                            </button>

                            <p className="text-xs text-slate-600 text-center">
                                Your data is safe. No spam, ever.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
