import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autheeka | Achetez vos billets d'événements",
  description: "La meilleure plateforme pour découvrir et acheter des billets pour dos événements",
};

export default function Home() {
  return (
    <>
      <main className="flex-1 overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-20 lg:pt-40 pb-20 min-h-screen flex items-center">
          <div className="mx-6 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64 grid lg:grid-cols-2 gap-12 gap-y-24  items-center">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
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
              <div className="flex gap-4">
                <a href="#" className="hover:-translate-y-1 transition-transform">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Disponible sur Google Play"
                    className="h-[52px] rounded-lg"
                  />
                </a>
              </div>
            </div>

            {/* Mockup decoration */}
            <div className="relative mx-auto flex justify-center w-full max-w-sm">
              <div
                className="relative bg-white rounded-[40px] overflow-hidden flex flex-col animate-[float_6s_ease-in-out_infinite]"
                style={{ width: '280px', height: '580px', boxShadow: '0 0 0 10px #F0F4F8, 0 20px 25px -5px rgba(0, 86, 255, 0.1)' }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-[#F0F4F8] rounded-b-[16px] z-10"></div>

                {/* Screen */}
                <div className="flex-1 bg-slate-50 pt-[60px] px-5 pb-5 flex flex-col gap-4">
                  <div className="flex justify-center mb-4">
                    <img src="/logo_text.png" alt="Autheeka" className="h-3.5 w-auto" />
                  </div>


                  <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-slate-200 rounded w-[120px] mb-1.5"></div>
                      <div className="h-2 bg-slate-200 rounded w-[80px]"></div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-slate-200 rounded w-[120px] mb-1.5"></div>
                      <div className="h-2 bg-slate-200 rounded w-[80px]"></div>
                    </div>
                  </div>

                  <div className="mt-auto bg-blue-600 text-white text-center p-4 rounded-full font-semibold text-[0.9rem]">
                    Scan Rapide
                  </div>
                </div>
              </div>

              {/* Decorative circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-600/10 to-[#00C6FF]/10 rounded-full blur-[40px] -z-10"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="mx-6 sm:mx-12 md:mx-24 lg:mx-40 xl:mx-64">
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
