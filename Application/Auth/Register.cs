using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces.GooglePlaces;
using Data;
using Domain.Classes;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Auth
{
    public class Register
    {
        public class Request : IRequest<Unit>
        {
            public string Username { get; set; }
            public string EmailAddress { get; set; }
            public string Password { get; set; }
            public DateTime DateOfBirth { get; set; }
            public bool TermsAndConditions { get; set; }
            public bool Online { get; set; }
            public bool InPerson { get; set; }
            public string GooglePlaceId { get; set; }
        }

        public class RequestValidator : AbstractValidator<Request>
        {
            public RequestValidator()
            {
                RuleFor(x => x.Username).NotEmpty().WithMessage("username cannot be empty");
                RuleFor(x => x.EmailAddress).NotEmpty().EmailAddress().WithMessage("invalid email address");
                RuleFor(x => x.Password).MinimumLength(6).Matches("^.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*$").WithMessage("password must be a minimum of 6 characters and contain one special character");
                RuleFor(x => x.DateOfBirth).LessThan(DateTime.Today.AddYears(18)).WithMessage("must be at least 13 years old");
                RuleFor(x => x.TermsAndConditions).Equal(true).WithMessage("must accept terms and conditions");
                RuleFor(x => x.InPerson).Equal(true).When(x => x.Online == false).WithMessage("must be either online or in person");
                RuleFor(x => x.Online).Equal(true).When(x => x.InPerson == false).WithMessage("must be either online or in person");
                RuleFor(x => x.GooglePlaceId).NotEmpty().WithMessage("Location cannot be empty");

            }
        }

        public class RequestHandler : IRequestHandler<Request, Unit>
        {
            private readonly UserManager<User> _userManager;
            private readonly IGooglePlacesApi _googlePlacesApi;  

            public RequestHandler(UserManager<User> userManager, IGooglePlacesApi googlePlacesApi)
            {
                _userManager = userManager;
                _googlePlacesApi = googlePlacesApi;
            }

            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                if (await _userManager.FindByEmailAsync(request.EmailAddress) != null ||
                    await _userManager.FindByNameAsync(request.Username) != null)
                {
                    throw new EntityAlreadyExistsException("User", "unable to complete registration - a user with that username or email address already exists");
                }

                var user = new User(request.Username, request.EmailAddress, request.DateOfBirth, request.TermsAndConditions, request.Online, request.InPerson, await _googlePlacesApi.GetLatLong(request.GooglePlaceId));
                await _userManager.CreateAsync(user, request.Password);

                return Unit.Value;
            }
        }
    }
}
