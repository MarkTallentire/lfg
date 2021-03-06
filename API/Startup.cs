using System.Reflection;
using System.Text;
using API.Middleware;
using Application.Auth;
using Application.AuthenticatedUser;
using Application.Interfaces;
using Application.Interfaces.AuthenticatedUser;
using Application.Interfaces.Email;
using Application.Interfaces.GooglePlaces;
using Data;
using Domain.Classes;
using FluentValidation.AspNetCore;
using Infrastructure;
using Infrastructure.Email;
using MailKit.Net.Smtp;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;


namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("Dev Policy", opt =>
                {
                    opt.AllowAnyHeader();
                    opt.AllowAnyMethod();
                    opt.AllowAnyOrigin();
                });
            });

            services.AddIdentityCore<User>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<DataContext>()
                .AddSignInManager<SignInManager<User>>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Temp Secret Key That Will Be Removed Before Production"));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false
                    };
                });

            services.AddAuthorization();
            services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("lfg"), x => x.UseNetTopologySuite());
            });

            var appAssembly = typeof(Register.RequestValidator).GetTypeInfo().Assembly;
            services.AddMediatR(appAssembly);
            services.AddLogging();
            
            services.AddControllers().AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssembly(appAssembly));
            

            services.AddHttpClient<IGooglePlacesApi, GooglePlacesApi>();
            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IHttpUserAccessor, HttpUserAccessor>();
            services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();
            services.AddScoped<ISmtpEmailSender, SmtpEmailSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            app.UseCors("Dev Policy");
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();


            

            app.UseExceptionHandlingMiddleware();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers()
                         .RequireAuthorization();
                endpoints.MapFallbackToFile("/index.html");
            });
        }
    }
}
