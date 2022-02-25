using Domain;
using FluentValidation;

namespace Application.Buchungen
{
    public class BuchungValidator : AbstractValidator<Buchung>
    {
        public BuchungValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            // RuleFor(x => x.Description).NotEmpty();
            // RuleFor(x => x.Date).NotEmpty();
            // RuleFor(x => x.Category).NotEmpty();
            // RuleFor(x => x.City).NotEmpty();
            // RuleFor(x => x.Venue).NotEmpty();
        }
    }
}