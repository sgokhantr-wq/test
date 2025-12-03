import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Shield, Bot, Zap, Database, Brain } from "lucide-react";

const CentaurusAI: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x070813, 0.0025);

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        const camera = new THREE.PerspectiveCamera(
            45,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            2000
        );
        camera.position.set(0, 0, 6);

        // Holographic sphere group
        const sphereGroup = new THREE.Group();
        scene.add(sphereGroup);

        const geo = new THREE.SphereGeometry(1.4, 64, 64);

        // Inner soft glow
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x14d4f4,
            transparent: true,
            opacity: 0.12,
        });
        const inner = new THREE.Mesh(geo, innerMat);
        inner.scale.set(0.98, 0.98, 0.98);
        sphereGroup.add(inner);

        // Wireframe overlay
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
        });
        const wire = new THREE.Mesh(geo, wireMat);
        sphereGroup.add(wire);

        // Outer ring
        const ringGeo = new THREE.RingGeometry(1.6, 1.63, 128);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x14f4f4,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI * 0.5;
        sphereGroup.add(ring);

        // Secondary ring at angle
        const ring2 = new THREE.Mesh(ringGeo, ringMat);
        ring2.rotation.x = Math.PI * 0.3;
        ring2.rotation.y = Math.PI * 0.4;
        sphereGroup.add(ring2);

        // Particle field
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 1.9 + Math.random() * 1.6;
            const theta = Math.random() * Math.PI * 2;
            const phi = (Math.random() - 0.5) * Math.PI * 0.5;
            const x = r * Math.cos(theta) * Math.cos(phi);
            const y = r * Math.sin(phi) * 0.4;
            const z = r * Math.sin(theta) * Math.cos(phi);
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            size: 0.025,
            transparent: true,
            opacity: 0.9,
            color: 0x06b6d4,
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Lighting
        const ambient = new THREE.AmbientLight(0x99d7ff, 0.6);
        scene.add(ambient);
        const dir = new THREE.DirectionalLight(0x06b6d4, 0.8);
        dir.position.set(5, 5, 5);
        scene.add(dir);

        // Handle resize
        function resize() {
            if (!canvas) return;
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
        window.addEventListener("resize", resize);

        // Mouse tracking
        const mouse = { x: 0, y: 0 };
        function onMove(e: MouseEvent) {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
        }
        window.addEventListener("mousemove", onMove);

        // Animation loop
        let t = 0;
        function animate() {
            t += 0.01;

            // Rotation with mouse interaction
            sphereGroup.rotation.y = t * 0.35 + mouse.x * 0.08;
            sphereGroup.rotation.x = mouse.y * 0.1;

            wire.rotation.y += 0.003 + mouse.x * 0.002;
            ring.rotation.z += 0.004;
            ring2.rotation.z -= 0.003;
            particles.rotation.y += 0.0008 + mouse.x * 0.0005;

            // Breathing effect
            const pulse = 1 + Math.sin(t * 1.2) * 0.01 + Math.abs(mouse.y) * 0.015;
            sphereGroup.scale.set(pulse, pulse, pulse);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();

        // Cleanup
        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            renderer.dispose();
            scene.clear();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#020814] via-[#05081f] to-[#0a0f1a] text-slate-100 overflow-hidden">
            {/* Animated starfield background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                <div className="starfield" aria-hidden="true" />
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl mx-auto"
                    >
                        {/* Header with status */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4"
                                >
                                    <Sparkles className="w-4 h-4 text-cyan-400" />
                                    <span className="text-sm text-cyan-300 font-medium">Next-Gen AI Workforce</span>
                                </motion.div>
                                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                                    Centaurus AI
                                </h1>
                                <p className="mt-4 text-xl md:text-2xl text-slate-300 max-w-2xl font-light">
                                    Your Intelligent Workforce — Powered by Open Source AI
                                </p>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-3 px-4 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                                <span className="text-sm text-slate-300 font-mono">System Status: <span className="text-emerald-400">ONLINE</span></span>
                            </motion.div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="text-lg text-slate-400 max-w-3xl mb-12"
                        >
                            A fine-tuned AI employee that adapts to your business and performs at the level of your best team members.
                            <span className="text-cyan-400 font-medium"> Private, customizable, and future-proof.</span>
                        </motion.p>

                        {/* 3D Globe Canvas */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="relative w-full flex justify-center mb-12"
                        >
                            <div className="relative w-full max-w-4xl h-[400px] md:h-[600px]">
                                <canvas
                                    ref={canvasRef}
                                    className="w-full h-full rounded-2xl"
                                    style={{
                                        background: 'radial-gradient(circle at center, rgba(6,182,212,0.05) 0%, transparent 70%)'
                                    }}
                                />

                                {/* Overlay UI on canvas */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                    className="absolute left-4 md:left-8 bottom-4 md:bottom-8 bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl px-4 md:px-6 py-3 md:py-4 shadow-2xl"
                                >
                                    <div className="text-sm md:text-base text-cyan-300 font-semibold mb-1">Centaurus Core</div>
                                    <div className="text-xs md:text-sm text-slate-300">Customized Intelligence. Enterprise Performance.</div>
                                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                        <span>Active Learning Mode</span>
                                    </div>
                                </motion.div>

                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-2xl" />
                                <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-cyan-500/30 rounded-tr-2xl" />
                                <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-cyan-500/30 rounded-bl-2xl" />
                                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyan-500/30 rounded-br-2xl" />
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link
                                to="/contact"
                                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105"
                            >
                                <span className="flex items-center gap-2">
                                    Request Early Access
                                    <Zap className="w-4 h-4 group-hover:animate-pulse" />
                                </span>
                            </Link>
                            <Link
                                to="/live-demo"
                                className="px-8 py-4 rounded-xl border-2 border-slate-700 hover:border-cyan-500 bg-slate-900/50 hover:bg-slate-800/50 text-slate-200 font-semibold transition-all duration-300 backdrop-blur-sm"
                            >
                                See Live Demo
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Feature Highlights */}
                <section className="container mx-auto px-4 py-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Enterprise-Grade AI Capabilities
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Brain,
                                    title: "Fine-Tunes Open-Source Models",
                                    description: "Customize LLaMA, Mistral, DeepSeek, and other models with your proprietary data and domain expertise."
                                },
                                {
                                    icon: Shield,
                                    title: "Private — Runs On-Prem or Cloud",
                                    description: "Full control over your data. Deploy on-premises or in your private cloud with complete security and compliance."
                                },
                                {
                                    icon: Bot,
                                    title: "Autonomous Workflows",
                                    description: "Automates reports, tasks, planning, and operational workflows without human intervention."
                                },
                                {
                                    icon: Database,
                                    title: "Continuous Learning",
                                    description: "Observes patterns, learns from feedback, and continuously improves performance over time."
                                },
                                {
                                    icon: Sparkles,
                                    title: "Real AI Employee",
                                    description: "Not just a chatbot. Takes actions, creates documents, sends emails, and manages complex business processes."
                                },
                                {
                                    icon: Zap,
                                    title: "Scalable Performance",
                                    description: "Perform like your best employees — or better. Scale across departments and use cases effortlessly."
                                }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                                            <feature.icon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2 text-slate-100 group-hover:text-cyan-300 transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* How It Works */}
                <section className="container mx-auto px-4 py-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            How It Works
                        </h2>

                        <div className="space-y-6">
                            {[
                                {
                                    step: "01",
                                    title: "Ingest Data & Knowledge",
                                    description: "Connect Centaurus to your existing systems, databases, and documentation to build a comprehensive knowledge base."
                                },
                                {
                                    step: "02",
                                    title: "Fine-Tune Open-Source Models",
                                    description: "We customize state-of-the-art models with your specific data and domain requirements for optimal performance."
                                },
                                {
                                    step: "03",
                                    title: "Deploy with Private Infrastructure",
                                    description: "Launch on your infrastructure with full control, security, and compliance guarantees."
                                },
                                {
                                    step: "04",
                                    title: "Continuous Improvement",
                                    description: "The system learns from interactions, feedback, and outcomes to constantly enhance accuracy and effectiveness."
                                }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-6 p-6 bg-slate-900/30 backdrop-blur-sm rounded-xl border border-slate-700/30 hover:border-cyan-500/30 transition-all"
                                >
                                    <div className="text-4xl font-bold text-cyan-500/30 font-mono">
                                        {item.step}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-2 text-slate-100">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Use Cases */}
                <section className="container mx-auto px-4 py-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Enterprise Use Cases
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "ERP Forecasting & Production Planning",
                                "Automated Document Generation",
                                "Email Management & Response",
                                "QA Automation & Process Monitoring",
                                "Supply Chain Analysis & Optimization",
                                "Business Intelligence & Reporting",
                                "Customer Support Automation",
                                "Compliance & Risk Assessment"
                            ].map((useCase, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center gap-3 p-4 bg-slate-900/30 backdrop-blur-sm rounded-lg border border-slate-700/30 hover:border-cyan-500/50 transition-all hover:bg-slate-800/30"
                                >
                                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                    <span className="text-slate-300">{useCase}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Why Centaurus */}
                <section className="container mx-auto px-4 py-16 mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Why Centaurus?
                        </h2>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            Unlike generic AI solutions, Centaurus is built specifically for enterprises that demand
                            <span className="text-cyan-400 font-semibold"> reliability, accuracy, and complete control</span>.
                            We fine-tune open-source models to understand your unique business context, then deploy them
                            securely within your infrastructure — delivering <span className="text-cyan-400 font-semibold">cost savings,
                                automation, and performance</span> that rivals or exceeds your top employees.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50"
                            >
                                Schedule a Consultation
                            </Link>
                        </div>
                    </motion.div>
                </section>
            </main>

            {/* Starfield CSS */}
            <style>{`
        .starfield {
          width: 200%;
          height: 200%;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04) 1px, transparent 1px),
            radial-gradient(circle at 80% 60%, rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(6,182,212,0.02) 1px, transparent 1px);
          background-size: 4px 4px, 6px 6px, 8px 8px;
          transform: translate(-25%, -25%) scale(1.4);
          filter: blur(0.6px);
          animation: drift 120s linear infinite;
        }
        @keyframes drift {
          from { transform: translate(-25%,-25%) scale(1.4) rotate(0deg); }
          to { transform: translate(-20%,-30%) scale(1.4) rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default CentaurusAI;
