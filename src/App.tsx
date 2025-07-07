import { useState, useEffect } from 'react';
import { Menu, Search, User, MapPin, ShoppingCart, Star, Check, Truck, Shield, MessageCircle, Heart, ThumbsUp } from 'lucide-react';

function App() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [userLocation, setUserLocation] = useState({ city: '', state: '' });

  const productImages = [
    "/Capturar_600x_1e241e7e-a8a3-4e94-874e-7934f626f48f_600x copy.webp",
    "/Capturar_500x_961049a8-4774-43e3-9632-2a965463394a_500x copy.webp",
    "/oralflow-acessorios-gratis-64167e50b23bb-large_600x_dadc719a-e9c5-4ad1-987e-a1933abe2cb8_600x.webp"
  ];

  // Buscar localização real do usuário usando geojs.io
  useEffect(() => {
    fetch('https://get.geojs.io/v1/ip/geo.json')
      .then(res => res.json())
      .then(data => {
        console.log('Geolocation data:', data); // Para debug
        if (data && data.city && data.region) {
          setUserLocation({ 
            city: data.city, 
            state: data.region 
          });
        } else {
          // Fallback para localização padrão
          setUserLocation({ city: '', state: '' });
        }
      })
      .catch(error => {
        console.error('Erro ao buscar localização:', error);
        setUserLocation({ city: '', state: '' });
      });
  }, []);

  const comments = [
    {
      id: 1,
      name: "Maria Silva",
      location: "São Paulo - SP",
      rating: 5,
      date: "2 dias atrás",
      comment: "Produto incrível! Meus dentes ficaram muito mais limpos e brancos. Recomendo demais!",
      likes: 12,
      verified: true
    },
    {
      id: 2,
      name: "João Santos",
      location: "Rio de Janeiro - RJ",
      rating: 5,
      date: "1 semana atrás",
      comment: "Melhor investimento que fiz para minha saúde bucal. O irrigador é muito eficiente e fácil de usar.",
      likes: 8,
      verified: true
    },
    {
      id: 3,
      name: "Ana Costa",
      location: "Belo Horizonte - MG",
      rating: 5,
      date: "3 dias atrás",
      comment: "Chegou super rápido e bem embalado. Já estou usando há uma semana e a diferença é notável!",
      likes: 15,
      verified: true
    },
    {
      id: 4,
      name: "Carlos Oliveira",
      location: "Salvador - BA",
      rating: 4,
      date: "5 dias atrás",
      comment: "Produto de qualidade, funciona exatamente como prometido. Minha dentista aprovou!",
      likes: 6,
      verified: true
    },
    {
      id: 5,
      name: "Fernanda Lima",
      location: "Brasília - DF",
      rating: 5,
      date: "1 dia atrás",
      comment: "Simplesmente perfeito! Meus dentes nunca estiveram tão limpos. Vale cada centavo!",
      likes: 9,
      verified: true
    }
  ];

  // Função para formatar a localização no container de entrega
  const formatShippingLocation = () => {
    if (userLocation.city && userLocation.state) {
      return `Envio para ${userLocation.city} - ${userLocation.state} e Região`;
    }
    return 'Envio para a região';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-600 mr-4" />
              <div className="flex items-center">
                <div className="text-2xl font-bold text-pink-500">avante</div>
                <div className="text-sm text-gray-600 ml-1">nas ofertas</div>
              </div>
            </div>
            
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="O que está buscando?"
                  className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <User className="h-6 w-6 text-gray-600" />
              <MapPin className="h-6 w-6 text-gray-600" />
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="O que está buscando?"
              className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-lg overflow-hidden">
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Truck className="h-4 w-4 mr-1" />
                Frete Grátis
              </div>
              <img
                src={productImages[selectedImage]}
                alt="OralFlow Irrigador Dental"
                className="w-full h-64 sm:h-80 lg:h-96 object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 justify-center lg:justify-start">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`Produto ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 lg:space-y-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">Novo | 508 Vendidos</div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                OralFlow + Kit de Acessórios Grátis! 
                <Check className="inline h-5 w-5 lg:h-6 lg:w-6 text-blue-500 ml-2" />
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4 lg:mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 lg:h-5 lg:w-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">4.7 (126 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900">R$ 28,41 no Pix</span>
              </div>
              
              <div className="text-sm text-gray-600">5x de R$ 5,98 sem juros</div>
              <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                R$ 100 de desconto
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    <img 
                      src="/correios-logo_1.svg" 
                      alt="Correios" 
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm lg:text-base">Entrega via Correios®</div>
                    <div className="text-xs lg:text-sm text-gray-600">
                      {formatShippingLocation()}
                    </div>
                  </div>
                </div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Frete Grátis
                </div>
              </div>
            </div>

            {/* Buy Button */}
            <a
              href="https://pay.sexpremium.shop/BNjzgPlqp5RgM78"
            >
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 lg:py-4 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Comprar agora
              </button>
            </a>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Compra 100% segura e protegida</span>
            </div>
          </div>
        </div>

        {/* Product Description Images */}
        <div className="mt-8 lg:mt-12 space-y-6 lg:space-y-8">
          {/* First Description Image */}
          <div className="w-full max-w-2xl mx-auto">
            <img 
              src="/oralflow_480x480.webp" 
              alt="OralFlow - Elimina e previne totalmente cáries, tártaro, amarelado e sangramento nos dentes"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Second Description Image */}
          <div className="w-full max-w-2xl mx-auto">
            <img 
              src="/ezgif.com-gif-maker_480x480_af37f563-297d-4fba-b692-881040f7bc81_480x480.webp" 
              alt="OralFlow demonstração de limpeza dental"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Third Description Image */}
          <div className="w-full max-w-2xl mx-auto">
            <img 
              src="/AnyConv.com__64139cf4d7e1e_480x480_66189bba-a6df-4261-b3e5-346b951920c8_480x480.webp" 
              alt="Dentes limpos, saudáveis e brancos - Tratamento Inovador OralFlow"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* New Description Images */}
          <div className="w-full max-w-2xl mx-auto">
            <img 
              src="/AnyConv.com__5_6_480x480_9aed699c-2340-4e19-beb9-318641096076_480x480.webp" 
              alt="OralFlow - Modos de uso e funcionalidades"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full max-w-2xl mx-auto">
            <img 
              src="/Inserir_um_titulo_34685d44-92ad-417a-a97a-9599247d50f8_600x600.webp" 
              alt="OralFlow - Kit de acessórios inclusos"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full max-w-2xl mx-auto">
            <img 
              src="/36_480x480.webp" 
              alt="Depoimento de Francisco - CE"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full max-w-2xl mx-auto">
            <img 
              src="/35_480x480.webp" 
              alt="Depoimento de Roberta - SP"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full max-w-2xl mx-auto">
            <img 
              src="/37_480x480.webp" 
              alt="Depoimento de Flávia - RS"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Final Payment and Security Image */}
          <div className="w-full max-w-2xl mx-auto">
            <img 
              src="/41_480x480.webp" 
              alt="Formas de pagamento e segurança"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12 lg:mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <MessageCircle className="h-6 w-6 text-pink-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Comentários dos Clientes</h2>
              <span className="ml-3 bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                {comments.length} avaliações
              </span>
            </div>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {comment.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900">{comment.name}</h3>
                          {comment.verified && (
                            <Check className="h-4 w-4 text-blue-500 ml-1" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{comment.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{comment.date}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{comment.comment}</p>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center text-gray-500 hover:text-pink-500 transition-colors">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">Útil ({comment.likes})</span>
                    </button>
                    <div className="flex items-center text-green-600 text-sm">
                      <Check className="h-4 w-4 mr-1" />
                      <span>Compra verificada</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Ver mais comentários
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <div className="text-2xl font-bold text-pink-500">avante</div>
                <div className="text-sm text-gray-400 ml-1">nas ofertas</div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Sua loja online de confiança com os melhores produtos para sua saúde e bem-estar.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold mb-4">Atendimento ao Cliente</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Central de Ajuda</li>
                <li>Como Comprar</li>
                <li>Política de Troca</li>
                <li>Política de Privacidade</li>
                <li>Termos de Uso</li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="font-semibold mb-4">Sobre a Loja</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Quem Somos</li>
                <li>Nossas Lojas</li>
                <li>Trabalhe Conosco</li>
                <li>Programa de Afiliados</li>
                <li>Sustentabilidade</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 (11) 4002-8922</p>
                <p>📧 contato@avantenasofertas.com.br</p>
                <p>🕒 Seg a Sex: 8h às 18h</p>
                <p>🕒 Sáb: 8h às 14h</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2024 Avante nas Ofertas. Todos os direitos reservados.
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>CNPJ: 12.345.678/0001-90</span>
                <span>•</span>
                <span>São Paulo - SP</span>
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center text-sm text-gray-400">
                <Shield className="h-5 w-5 mr-2 text-green-500" />
                <span>Site 100% Seguro</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Truck className="h-5 w-5 mr-2 text-blue-500" />
                <span>Frete Grátis Brasil</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                <span>Garantia de Qualidade</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;