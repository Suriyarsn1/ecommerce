import { MdHourglassEmpty, MdLocalShipping, MdCheckCircle } from "react-icons/md";

/**
 * OrderTracking component
 * Shows a horizontal stepper to indicate order status.
 * @param {string} currentStatus - The current status of the order (pending, shipped, delivered)
 */
function OrderTracking({ currentStatus }) {
  console.log(currentStatus)
  // Define the steps for the order tracking
  const steps = [
    { key: 'pending', label: 'Pending', icon: MdHourglassEmpty, color: 'bg-yellow-500', ring: 'ring-yellow-200' },
     { key: 'processed', label: 'processed', icon: MdHourglassEmpty, color: 'bg-yellow-500', ring: 'ring-yellow-200' },
    { key: 'shipped', label: 'Shipped', icon: MdLocalShipping, color: 'bg-blue-500', ring: 'ring-blue-200' },
    { key: 'delivered', label: 'Delivered', icon: MdCheckCircle, color: 'bg-green-500', ring: 'ring-green-200' }
  ];


  const currentIndex = steps.findIndex(item => item.key === currentStatus);

  return (
    // Responsive container for the stepper
    <div className="flex flex-wrap gap-4 items-center justify-center py-3">
      {steps.map((step, idx) => {
       
        const Icon = step.icon;
     
        const isActive = idx <= currentIndex;

        return (
          // Step item
          <div
            key={step.key}
            className={`flex flex-col items-center transition-all duration-300 group`}
          >
          
            <div
              className={`
                ${step.color}
                ${isActive ? step.ring : "ring-gray-200"}
                rounded-full p-2 shadow-lg
                transition-all duration-300
                ${isActive ? "scale-110 opacity-100" : "opacity-40"}
                ring-4
                animate-fade-in-up
              `}
            >
              <Icon className="text-white text-2xl sm:text-3xl" />
            </div>
            {/* Step label */}
            <span
              className={`
                mt-2 text-xs sm:text-sm font-semibold
                transition-colors duration-300
                ${isActive ? "text-gray-900" : "text-gray-400"}
              `}
            >
              {step.label}
            </span>
         
            {idx < steps.length - 1 && (
              <div
                className={`
                  w-10 h-1 mt-2 rounded-full
                  ${isActive && idx < currentIndex ? step.color : "bg-gray-200"}
                  transition-all duration-300
                  hidden sm:block
                `}
              />
            )}
          </div>
        );
      })}
      {/* Animation style for fade-in-up */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
}

export default OrderTracking;
