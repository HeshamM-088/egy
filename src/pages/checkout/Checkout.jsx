import React, { useState, useCallback, useMemo } from 'react';



const THEME_COLOR = "#429E9D"; 
const THEME_SHADE_50 = "rgb(238, 248, 248)";
const THEME_SHADE_600 = "rgb(66, 158, 157)"; 
const THEME_SHADE_700 = "rgb(55, 131, 130)"; 

const defaultIconProps = {
  className: "w-6 h-6",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const UserIcon = (props) => (
  <svg {...defaultIconProps} {...props} viewBox="0 0 24 24">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MapPinIcon = (props) => (
  <svg {...defaultIconProps} {...props} viewBox="0 0 24 24">
    <path d="M12 18s-4 4-4 7s4 1 4 1s4-4 4-7s-4-1-4-1z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CreditCardIcon = (props) => (
  <svg {...defaultIconProps} {...props} viewBox="0 0 24 24">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const WalletIcon = (props) => (
  <svg {...defaultIconProps} {...props} viewBox="0 0 24 24">
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h14a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h14a1 1 0 0 0 1-1v-3" />
    <path d="M20 9v6" />
  </svg>
);

const AlertCircleIcon = (props) => (
  <svg {...defaultIconProps} {...props} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const CheckIcon = (props) => (
  <svg {...defaultIconProps} {...props} viewBox="0 0 24 24">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XIcon = (props) => (
  <svg {...defaultIconProps} {...props} viewBox="0 0 24 24">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const BackArrowIcon = (props) => (
    <svg {...defaultIconProps} {...props} viewBox="0 0 24 24">
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

const CalendarIcon = (props) => (
    <svg {...defaultIconProps} {...props} viewBox="0 0 24 24">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
        <line x1="16" x2="16" y1="2" y2="6"/>
        <line x1="8" x2="8" y1="2" y2="6"/>
        <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
);

const CardLogos = {
  Visa: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="14" rx="3" fill="#1A1F71"/>
      <path d="M10.8 12.5H13.2L12 18H9L10.8 12.5Z" fill="white"/>
      <path d="M4 8H7.5L8 10H4V8Z" fill="#F79F1A"/>
      <path d="M20 10H16V14H20V10Z" fill="#F79F1A"/>
    </svg>
  ),
  Mastercard: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.5" cy="12" r="5.5" fill="#EB001B"/>
      <circle cx="14.5" cy="12" r="5.5" fill="#FF5F00" opacity="0.8"/>
    </svg>
  ),
  Amex: (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="14" rx="3" fill="#006FCF"/>
      <path d="M6 8H18L17 16H7L6 8Z" fill="white"/>
    </svg>
  ),
};

const cardTypes = [
  { name: 'Visa', logo: CardLogos.Visa },
  { name: 'Mastercard', logo: CardLogos.Mastercard },
  { name: 'Amex', logo: CardLogos.Amex },
];

const mockBooking = {
  name: "Pyramids Sound & Light Show",
  description: "Experience the magic of ancient Egypt with a spectacular sound and light show at the Pyramids of Giza.",
  date: "Saturday, November 15, 2025",
  time: "7:00 PM",
  location: "Giza Plateau, Cairo, Egypt",
  image: "../../../public/egypt.webp",
  unitPrice: 45.00,
  serviceFee: 5.00,
  orderId: "#543210",
  termsLink: "#",
};


const InputField = ({ label, name, value, onChange, icon: Icon, required, type = 'text', maxLength, placeholder = '' }) => (
  <div className="relative w-full">
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      placeholder={placeholder || label}
      className="peer w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-transparent transition-all focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white"
      style={{
          '--theme-color': THEME_COLOR,
          '--theme-color-darker': THEME_SHADE_700,
          borderColor: value && required && !value.match(/.+/) ? 'red' : undefined, 
      }}
      onFocus={(e) => e.target.style.borderColor = THEME_COLOR}
      onBlur={(e) => e.target.style.borderColor = 'rgb(209 213 219)'} 
    />
    <label
      htmlFor={name}
      className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm dark:bg-gray-800 dark:text-gray-400"
      style={{
          color: (value || name === 'expiration' || name === 'cvc') ? 'rgb(107 114 128)' : undefined,
          transition: 'color 0.2s',
      }}
      onFocus={(e) => e.target.style.color = THEME_COLOR}
      onBlur={(e) => e.target.style.color = 'rgb(107 114 128)'} 
    >
      {label} {required && '*'}
    </label>
    {Icon && (
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
        <Icon className="h-5 w-5" />
      </div>
    )}
  </div>
);

const MessageBanner = ({ message, type, onClose }) => {
  if (!message) return null;

  const colorClasses = {
    error: 'bg-red-100 text-red-800 border-red-500 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
    success: 'bg-green-100 text-green-800 border-green-500 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
    info: `text-gray-800 border-gray-500 dark:text-gray-300 dark:border-gray-700`, 
  };
  
  const Icon = type === 'error' ? AlertCircleIcon : CheckIcon; 

  return (
    <div className={`p-4 mb-6 rounded-xl shadow-lg border-l-4 ${colorClasses[type]}`} style={{backgroundColor: type === 'info' ? THEME_SHADE_50 : undefined}}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Icon className="h-6 w-6 mr-3" style={{color: type === 'info' ? THEME_COLOR : undefined}}/>
          <p className="font-medium">{message}</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-opacity-80 transition">
          <XIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const CardContainer = ({ title, icon: Icon, children, noIcon }) => (
    <div className="rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800 dark:border dark:border-gray-700 mb-6">
      {(title || !noIcon) && (
        <div className={`flex items-center gap-3 ${children ? 'mb-6 border-b pb-4 border-gray-100 dark:border-gray-700' : 'mb-0'}`}>
          {Icon && <Icon className="w-6 h-6" style={{color: THEME_COLOR}} />}
          {title && <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>}
        </div>
      )}
      {children}
    </div>
);


const Checkout = () => {
  const booking = mockBooking; 

  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectedCardType, setSelectedCardType] = useState(cardTypes[0].name); 
  const [saveCard, setSaveCard] = useState(false);
  const [message, setMessage] = useState(null);

  const { totalAmount, subtotal, ticketPriceDetails } = useMemo(() => {
    const sub = booking.unitPrice * ticketQuantity;
    const finalTotal = sub + booking.serviceFee;
    
    return {
        subtotal: sub.toFixed(2),
        totalAmount: `$${finalTotal.toFixed(2)}`,
        ticketPriceDetails: `Tickets (${ticketQuantity}x $${booking.unitPrice.toFixed(2)})`
    };
  }, [booking.unitPrice, booking.serviceFee, ticketQuantity]);


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiration: "",
    cvc: "",
    nameOnCard: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (name === 'cardNumber') {
      sanitizedValue = sanitizedValue.replace(/[^0-9]/g, '').slice(0, 16);
    } else if (name === 'cvc') {
      sanitizedValue = sanitizedValue.replace(/[^0-9]/g, '').slice(0, 4);
    } else if (name === 'expiration') {
        let v = value.replace(/[^0-9]/g, '');
        if (v.length > 2) {
            v = v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        sanitizedValue = v.slice(0, 5);
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    if (ticketQuantity === 0) {
        setMessage({ type: 'error', text: "Please select at least one ticket." });
        return;
    }

    if (!formData.fullName || !formData.email || !formData.cardNumber || !formData.cvc || !formData.expiration || !formData.nameOnCard) {
      setMessage({ type: 'error', text: "Please fill in all required fields (Contact and Payment Details)." });
      return;
    }
    if (formData.cardNumber.length !== 16) {
      setMessage({ type: 'error', text: "Please enter a valid 16-digit card number." });
      return;
    }
    if (formData.expiration.length !== 5) {
      setMessage({ type: 'error', text: "Please enter the expiration date in MM/YY format." });
      return;
    }

    setMessage({ 
      type: 'success', 
      text: `Payment of ${totalAmount} for ${booking.name} initiated successfully using ${selectedCardType}. Thank you!` 
    });
    console.log("Form Data:", { ...formData, selectedCardType, saveCard, ticketQuantity });
  };

  const EventDetailsCard = () => (
    <CardContainer noIcon>
        <div className="flex gap-4">
            <img 
                src={booking.image} 
                alt={booking.name} 
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shadow-md"
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/100x100/FACC15/78350F?text=Event"; 
                }}
            />
            <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{booking.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{booking.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" style={{color: THEME_COLOR}}/>
                        {booking.date} at {booking.time}
                    </div>
                    <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" style={{color: THEME_COLOR}}/>
                        {booking.location}
                    </div>
                </div>
            </div>
        </div>
    </CardContainer>
  );

  const TicketSelectionCard = () => (
    <CardContainer title="Select Tickets" noIcon>
        <div className="flex justify-between items-center py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">General Admission</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">${booking.unitPrice.toFixed(2)} per ticket</p>
            </div>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                    type="button"
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition"
                    aria-label="Decrease ticket quantity"
                    disabled={ticketQuantity <= 1}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
                </button>
                <input
                    type="text"
                    value={ticketQuantity}
                    onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setTicketQuantity(Math.max(1, Math.min(10, val)));
                    }}
                    className="w-10 text-center bg-transparent border-x border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white font-medium focus:outline-none"
                    aria-label="Ticket quantity"
                />
                <button
                    type="button"
                    onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition"
                    aria-label="Increase ticket quantity"
                    disabled={ticketQuantity >= 10}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m-8-8h16"/></svg>
                </button>
            </div>
        </div>
    </CardContainer>
  );


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 font-[Inter]">
      
      <style>{`
        /* Custom Tailwind class overrides for theme color */
        .peer:focus ~ label {
          color: ${THEME_COLOR} !important;
        }
        .peer:focus {
          border-color: ${THEME_COLOR} !important;
          box-shadow: 0 0 0 1px ${THEME_COLOR};
        }
      `}</style>
      
      <header className="mb-8 flex items-center border-b border-gray-200 dark:border-gray-800 pb-6 -mx-4 sm:-mx-8 px-4 sm:px-8 bg-white dark:bg-gray-900 sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => console.log('Back button clicked')}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2"
          style={{
              '--ring-color': THEME_COLOR,
              boxShadow: '0 0 0 0 var(--ring-color)',
          }}
          aria-label="Go back to previous page"
        >
            <BackArrowIcon className="w-6 h-6" />
        </button>
        <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Complete Your Booking</h1>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-0.5">Secure your spot at this amazing event</p>
        </div>
      </header>

      <MessageBanner 
        message={message?.text} 
        type={message?.type} 
        onClose={() => setMessage(null)} 
      />

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row justify-center items-start gap-8">
        
        <div className="w-full lg:w-2/3">

          <EventDetailsCard />
          
          <TicketSelectionCard />
          
          <CardContainer title="Contact Details" icon={UserIcon}>
            <div className="space-y-6">
              <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
              <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <InputField label="Phone Number (Optional)" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
            </div>
          </CardContainer>

          <CardContainer title="Billing Address" icon={MapPinIcon}>
            <div className="space-y-6">
              <InputField label="Street Address" name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
              <div className="flex gap-4">
                <InputField label="City" name="city" value={formData.city} onChange={handleChange} required />
                <InputField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
              </div>
            </div>
          </CardContainer>
          
          <CardContainer title="Payment Details" icon={CreditCardIcon}>
            
            <div className="flex items-center gap-4 mb-8">
              {cardTypes.map((card) => (
                <div
                  key={card.name}
                  onClick={() => setSelectedCardType(card.name)}
                  className={`p-3 border rounded-xl transition-all cursor-pointer flex justify-center items-center ${
                    selectedCardType === card.name
                      ? 'ring-2 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  style={{
                    borderColor: selectedCardType === card.name ? THEME_COLOR : undefined,
                    boxShadow: selectedCardType === card.name ? `0 0 0 2px ${THEME_COLOR}30` : undefined, 
                    backgroundColor: selectedCardType === card.name ? THEME_SHADE_50 : undefined,
                  }}
                >
                  <div className={`${selectedCardType === card.name ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                    {card.logo}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <InputField 
                label="Card Number" 
                name="cardNumber" 
                value={formData.cardNumber} 
                onChange={handleChange} 
                icon={CreditCardIcon}
                required 
                maxLength={16} 
                type="tel"
              />
              
              <div className="flex gap-4">
                <InputField 
                  label="Expiration (MM/YY)" 
                  name="expiration" 
                  value={formData.expiration} 
                  onChange={handleChange} 
                  required 
                  maxLength={5}
                  type="tel"
                />
                <InputField 
                  label="CVC" 
                  name="cvc" 
                  value={formData.cvc} 
                  onChange={handleChange} 
                  required 
                  maxLength={4}
                  type="password"
                />
              </div>

              <InputField
                label="Name on Card"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-6 flex items-center">
                <input
                    id="save-card"
                    type="checkbox"
                    checked={saveCard}
                    onChange={() => setSaveCard(!saveCard)}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-4 dark:border-gray-600 dark:bg-gray-700"
              
                    style={{
                        backgroundColor: saveCard ? THEME_COLOR : undefined,
                        borderColor: saveCard ? THEME_COLOR : undefined,
                        boxShadow: '0 0 0 0 rgba(0,0,0,0)', 
                    }}
                    onFocus={(e) => e.target.style.boxShadow = `0 0 0 4px ${THEME_COLOR}40`}
                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 0 rgba(0,0,0,0)'}
                />
                <label htmlFor="save-card" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    Save this card for future payments
                </label>
            </div>
          </CardContainer>
        </div>


        <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
          <CardContainer title="Order Summary" icon={WalletIcon}>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-6">
              
              <div className="flex justify-between pb-2">
                <span className="font-medium text-gray-500 dark:text-gray-400">Order ID</span>
                <span className="font-semibold text-gray-800 dark:text-white">{booking.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Booking</span>
                <span className="max-w-[60%] text-right font-medium">{booking.name}</span>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{ticketPriceDetails}</span>
                      <span className="font-semibold">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Service Fee</span>
                      <span className="font-semibold">${booking.serviceFee.toFixed(2)}</span>
                  </div>
              </div>

              <div className="pt-2">
                  <div className="flex items-center">
                    <input
                        id="terms-check"
                        type="checkbox"
                        required
                        className="h-4 w-4 rounded border-gray-300 focus:ring-4 dark:border-gray-600 dark:bg-gray-700"
                        style={{
                            backgroundColor: document.getElementById('terms-check')?.checked ? THEME_COLOR : undefined,
                            borderColor: document.getElementById('terms-check')?.checked ? THEME_COLOR : undefined,
                            boxShadow: '0 0 0 0 rgba(0,0,0,0)',
                        }}
                        onFocus={(e) => e.target.style.boxShadow = `0 0 0 4px ${THEME_COLOR}40`}
                        onBlur={(e) => e.target.style.boxShadow = '0 0 0 0 rgba(0,0,0,0)'}
                    />
                    <label htmlFor="terms-check" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                        I agree to the <a href={booking.termsLink} className="hover:underline font-medium" style={{color: THEME_COLOR}} target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
                    </label>
                  </div>
              </div>

              <div className="border-t pt-4 border-gray-200 dark:border-gray-700"></div>

              <div className="flex justify-between font-extrabold text-xl text-gray-900 dark:text-white">
                <span>TOTAL AMOUNT</span>
                <span style={{color: THEME_COLOR}}>{totalAmount}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg py-3 text-lg font-bold text-white shadow-xl transition-all focus:outline-none focus:ring-4"
              style={{
                backgroundColor: THEME_SHADE_600,
                boxShadow: `0 10px 15px -3px ${THEME_COLOR}80, 0 4px 6px -4px ${THEME_COLOR}80`, 
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = THEME_SHADE_700}
              onMouseLeave={(e) => e.target.style.backgroundColor = THEME_SHADE_600}
              onFocus={(e) => e.target.style.boxShadow = `0 0 0 4px ${THEME_COLOR}50`}
              onBlur={(e) => e.target.style.boxShadow = `0 10px 15px -3px ${THEME_COLOR}80, 0 4px 6px -4px ${THEME_COLOR}80`}
            >
              PAY NOW {totalAmount}
            </button>

          </CardContainer>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
