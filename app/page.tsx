import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-40 pb-20 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start">
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6">
                ✨ Nouveau sur les stores
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                Vos événements, <br />
                <span className="bg-gradient-to-br from-blue-600 to-[#00C6FF] bg-clip-text text-transparent">
                  simplifiés.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg">
                Découvrez Autheeka, la plateforme ultime qui combine réseau social
                événementiel, billetterie sécurisée et contrôle d'accès ultra-rapide.
                L'esprit tranquille, du billet à l'entrée.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="hover:-translate-y-1 transition-transform">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Disponible sur Google Play"
                    className="h-14 bg-black rounded-lg"
                  />
                </a>
              </div>
            </div>
            
            {/* Mockup decoration */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative z-10 bg-white rounded-[40px] shadow-2xl border-[8px] border-gray-900 overflow-hidden aspect-[9/19] flex flex-col items-center">
                <div className="w-1/2 h-6 bg-gray-900 rounded-b-xl absolute top-0"></div>
                <div className="mt-16 text-2xl font-bold text-blue-600 mb-8">Autheeka</div>
                
                <div className="w-4/5 bg-gray-50 rounded-xl p-4 mb-4 shadow-sm border border-gray-100 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-100"></div>
                   <div className="flex-1 space-y-2">
                     <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                     <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                   </div>
                </div>

                <div className="w-4/5 bg-gray-50 rounded-xl p-4 mb-8 shadow-sm border border-gray-100 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-green-100"></div>
                   <div className="flex-1 space-y-2">
                     <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                     <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                   </div>
                </div>

                <div className="w-4/5 py-3 bg-blue-600 text-white text-center rounded-full font-semibold shadow-md">
                  Scan Rapide
                </div>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-10 -right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">
              Pourquoi choisir Autheeka ?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold mb-3">Social</h3>
                <p className="text-gray-600">
                  Découvrez des événements uniques, rencontrez la communauté et
                  partagez vos meilleures expériences.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                <div className="text-4xl mb-4">🎟️</div>
                <h3 className="text-xl font-bold mb-3">Sécurisée</h3>
                <p className="text-gray-600">
                  Achetez et gérez vos billets en toute confiance grâce à notre
                  système d'authentification infalsifiable.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3">Accès Ultra-Rapide</h3>
                <p className="text-gray-600">
                  Fini les files d'attente. Entrez en un clin d'œil grâce à notre
                  technologie de scan de validation instantanée.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
