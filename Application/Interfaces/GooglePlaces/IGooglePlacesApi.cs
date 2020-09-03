using System.Threading.Tasks;
using NetTopologySuite.Geometries;

namespace Application.Interfaces.GooglePlaces
{
    public interface IGooglePlacesApi
    {
        Task<Point> GetLatLong(string googlePlacesId);

    }
}
