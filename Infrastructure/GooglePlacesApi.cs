using System;
using System.Net.Http;
using System.Threading.Tasks;
using Application.Interfaces.GooglePlaces;
using Microsoft.Extensions.Configuration;
using NetTopologySuite.Geometries;
using Newtonsoft.Json;

namespace Infrastructure
{
    public class GooglePlacesApi : IGooglePlacesApi
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly string _baseUrl = $"https://maps.googleapis.com/maps/api/place/details/json";

        public GooglePlacesApi(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _httpClient.BaseAddress = new Uri(_baseUrl);
        }

        public async Task<Point> GetLatLong(string googlePlacesId)
        {
            var request = await _httpClient.GetAsync($"?key={_configuration["ApiKeys:GooglePlaces"]}&place_id={googlePlacesId}&fields=geometry");
            request.EnsureSuccessStatusCode();
            var json = JsonConvert.DeserializeObject<GooglePlacesGeometryResult>(
                await request.Content.ReadAsStringAsync());

            if(json.Result == null)
                return new Point(0,0);

            return new Point(json.Result.Geometry.Location.Lng, json.Result.Geometry.Location.Lat);
        }
    }

    public partial class GooglePlacesGeometryResult
    {
        [JsonProperty("html_attributions")]
        public object[] HtmlAttributions { get; set; } 

        [JsonProperty("result")]
        public Result Result { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }

    public partial class Result
    {
        [JsonProperty("geometry")]
        public Geometry Geometry { get; set; }
    }

    public partial class Geometry
    {
        [JsonProperty("location")]
        public Location Location { get; set; }

        [JsonProperty("viewport")]
        public Viewport Viewport { get; set; }
    }

    public partial class Location
    {
        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lng")]
        public double Lng { get; set; }
    }

    public partial class Viewport
    {
        [JsonProperty("northeast")]
        public Location Northeast { get; set; }

        [JsonProperty("southwest")]
        public Location Southwest { get; set; }
    }
}
