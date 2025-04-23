import { FaEdit, FaHeart, FaMapMarkerAlt, FaTrash } from "react-icons/fa";

const AnimalCard = ({ animal, currentUserId, onEdit, onDelete, onToggleFavorite }) => {
    const isOwner = animal.userId === currentUserId
    const formattedDate = animal.createdAt.toLocaleDateString()
    
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-all hover:translate-y-[-5px] hover:shadow-lg cursor-pointer">
        <div className="relative h-52">
          <img 
            src={animal.imageBase64} 
            alt={animal.title} 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-2 rounded-lg font-semibold text-sm">
            PKR {animal.price.toLocaleString()}
          </div>
          
          {isOwner && (
            <div className="absolute top-3 right-3 flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(animal);
                }}
                className="bg-white/90 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center text-blue-500"
              >
                <FaEdit />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(animal.id);
                }}
                className="bg-white/90 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(animal.id);
            }}
            className={`absolute top-3 left-3 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center transition-all ${animal.favorite ? 'text-red-500' : 'text-gray-400'}`}
          >
            <FaHeart />
          </button>
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{animal.title}</h3>
          
          <div className="flex items-center gap-4 mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded capitalize">
              {animal.type.replace('-', ' ')}
            </span>
            
            <span className="text-gray-500 text-sm flex items-center">
              <FaMapMarkerAlt className="mr-1" /> {animal.location}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{animal.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {animal.color && (
              <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded">
                {animal.color}
              </span>
            )}
            {animal.age && (
              <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded">
                {animal.age}
              </span>
            )}
            {animal.weight && (
              <span className="bg-gray-100 text-gray-600 text-xs py-1 px-2 rounded">
                {animal.weight}
              </span>
            )}
          </div>
          
          <div className="text-gray-400 text-xs mt-3">
            Listed on {formattedDate}
          </div>
        </div>
      </div>
    )
  }

  export default AnimalCard;