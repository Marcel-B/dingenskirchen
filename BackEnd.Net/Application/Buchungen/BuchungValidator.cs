using Application.Activities;
using Domain;
using FluentValidation;

namespace Application.Buchungen
{
    public class BuchungValidator : AbstractValidator<BuchungDto>
    {
        public BuchungValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Betrag).NotEmpty().GreaterThan(0);
            // RuleFor(x => x.Date).NotEmpty();
            // RuleFor(x => x.Category).NotEmpty();
            // RuleFor(x => x.City).NotEmpty();
            // RuleFor(x => x.Venue).NotEmpty();
        }
    }
}