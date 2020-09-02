using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using CountryData;
using CountryData.Standard;

namespace Data
{
    public static class Seed
    {
        public static void SeedData(DataContext context)
        {
            var helper = new CountryHelper();
            var data = helper.GetCountryData();

            foreach (var country in data)
            {
                Debug.Print(country.CountryName);
               
                var regions = data.Where(x => x.CountryShortCode == country.CountryShortCode)
                    .Select(r => r.Regions).FirstOrDefault()
                    .ToList();

                foreach (var region in regions)
                {
                    Debug.Print(region.Name);
                }
            }


        }
    }
}
