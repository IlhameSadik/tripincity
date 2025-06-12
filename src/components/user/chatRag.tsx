import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Map, Bookmark, Star, ChevronDown, X } from 'react-bootstrap-icons';
import logo from '../../assets/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sampleResponses } from '../data';

export default function TripnCityRAGAssistant() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<
    { text: string; sender: string; sources?: { id: string; title: string; type?: string; relevance?: number }[]; error?: boolean }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
const [cities, setCities] = useState([
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Fès',
  'Tanger',
  'Agadir',
  'Meknès',
  'Oujda',
  'Tétouan',
  'Laâyoune',
  'Mohammédia',
  'Nador',
  'Khouribga',
  'El Jadida',
  'Béni Mellal',
  'Taza',
  'Kénitra',
  'Errachidia',
  'Ouarzazate',
  'Al Hoceïma',
  'Safi',
  'Settat',
  'Larache',
  'Khemisset',
  'Berrechid',
  'Guelmim',
  'Essaouira',
  'Taroudant',
  'Tan-Tan',
  'Tiflet',
  'Midelt',
  'Azrou',
  'Zagora',
  'Ifrane'
]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]); // sélection utilisateur
const [availableCategories] = useState([
  { id: 'monument', name: 'Monuments' },
  { id: 'restaurant', name: 'Restaurants' },
  { id: 'activity', name: 'Activities' },
  { id: 'event', name: 'event' },
{ id: 'hotel', name: 'hotel' }

]);


  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // fetch('/api/cities').then(res => res.json()).then(setCities);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setMessages(prev => [...prev, { text: query, sender: 'user' }]);
    setIsLoading(true);

    try {
      setTimeout(() => {
        const response = {
          text: generateSampleResponse(query, selectedCity, categories),
          sources: [
    { id: 'src1', title: `TripInCity - Guide `, type: 'article', relevance: 0.95 },
  
  ]};

        setMessages(prev => [
          ...prev,
          {
            text: response.text,
            sender: 'assistant',
            sources: response.sources
          }
        ]);

        setIsLoading(false);
        setQuery('');
      }, 1500);
    } catch (error) {
      console.error('Error querying RAG service:', error);
      setMessages(prev => [
        ...prev,
        {
          text: "Je suis désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.",
          sender: 'assistant',
          error: true
        }
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

// Quels sont les endroits incontournables à visiter à Marrakech en une journée ?
 // const generateSampleResponse = (query, city, cats) => {
    //if (city === 'Marrakech') {
   // return `Pour votre question "${query}"${city ? ' concernant ' + city : ''},  Jemaa el-Fna, souks, mosquée Koutoubia, palais Bahia, jardin Majorelle, et un rooftop au coucher du soleil.`;
    //}
    //return `Pour votre question "${query}"${city ? ' concernant ' + city : ''}, aucun résultat pertinent n’a été trouvé. Veuillez reformuler votre question ou essayer avec une autre ville ou catégorie.`;
  //};



const generateSampleResponse = (query, city, cats) => {
  const cityData = sampleResponses[city];

 // La fonction qui renvoie la réponse adaptée
  if (cityData) {
    if (cats && cats.length > 0) {
  const matchedResponses = cats
    .filter((cat) => cityData[cat.id])
    .map((cat) => `- ${cat.name} : ${cityData[cat.id]}`);

  if (matchedResponses.length > 0) {
    return `Pour votre question "${query}" à ${city}, voici les résultats par catégorie sélectionnée :\n\n${matchedResponses.join('\n')}`;
  }
}

    return `Pour votre question "${query}" concernant ${city}, ${cityData.default}`;
  }
  return "Aucun résultat pertinent n’a été trouvé. Veuillez reformuler votre question ou essayer avec une autre ville ou catégorie.";
};

 
  const toggleCategory = (category) => {
    if (categories.find(c => c.id === category.id)) {
      setCategories(categories.filter(c => c.id !== category.id));
    } else {
      setCategories([...categories, category]);
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <div className="bg-white d-flex align-items-center justify-content-between p-3 shadow-sm">
  <img src={logo} alt="TripnCity Logo" className="img-fluid" style={{ maxHeight: '50px' }} />
  <a href="https://tripncity.com/#" className="arrow-btn" aria-label="Retour à l'accueil">
    &#8592; <span className='d-none d-md-inline'>Revient à l'accueil</span>
  </a>
</div>



      {/* Filters */}
      <div className="bg border-bottom p-3 shadow-sm">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-3 col-12">
              <select
                className="form-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Toutes les villes</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="col-md-9 col-12">
              <div className="d-flex flex-wrap gap-2">
                {availableCategories.map(category => {
                  const isSelected = categories.find(c => c.id === category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category)}
                      className={`btn btn-sm ${isSelected ? 'btn-dark' : 'btn-outline-light'}`}
                    >
                      {category.name}
                      {isSelected && <X className="ms-1" size={14} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow-1 overflow-auto ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="">
              {messages.length === 0 ? (
                <div className="text-center py-5">
                  <div className="d-inline-flex bg-light p-4 rounded-circle mb-3">
                    <Map size={48} className="text" />
                  </div>
                  <h2 className="h3 fw-bold mb-2">Planifiez votre voyage avec l'Assistant TripnCity</h2>
                  <p className="text-muted mb-4">
                    Posez des questions sur les destinations, attractions, restaurants 
                    et plus encore. Notre assistant utilise les informations des voyageurs 
                    pour vous offrir les meilleures recommandations.
                  </p>
                  
                </div>
              ) : (
                <div className="mb-3">
                  {messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}
                    >
                      <div
                        className={`max-width-66 p-3 rounded ${
                          message.sender === 'user'
                            ? 'bg text-white rounded-bottom-end-0'
                            : 'bg-light border rounded-bottom-start-0'
                        }`}
                        style={{ maxWidth: '66%' }}
                      >
                        <div style={{ whiteSpace: 'pre-wrap' }}>{message.text}</div>

                        {message.sender === 'assistant' && message.sources && (
                          <div className="mt-2 pt-2 border-top small">
                            <p className="text-muted mb-1">Sources:</p>
                            <div className="d-flex flex-wrap gap-1">
                              {message.sources.map(source => (
                                <span key={source.id} className="badge bg-light text-dark border">
                                  {source.title} ({Math.round((source.relevance ?? 0) * 100)}%)
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-top bg-white p-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Posez une question sur votre destination..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <button
                  className="btn btn-dark"
                  onClick={handleSubmit}
                  disabled={isLoading || !query.trim()}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
              <div className="text-center small text-muted mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
