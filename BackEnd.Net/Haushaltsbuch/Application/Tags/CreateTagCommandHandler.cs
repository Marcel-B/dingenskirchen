using Application.Tags.Commands;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Tags;

public class CreateTagCommandHandler : IRequestHandler<CreateTagCommand>
{
    private readonly DataContext context;

    public CreateTagCommandHandler(DataContext context)
    {
        this.context = context;
    }

    public async Task<Unit> Handle(CreateTagCommand request, CancellationToken cancellationToken)
    {
        context.Tags.Add(request.Tag);
        await context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}