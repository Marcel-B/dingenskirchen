using System.Threading;
using System.Threading.Tasks;
using Application.Tags.Commands;
using MediatR;
using Persistence;

namespace Application.Tags;

public class DeleteTagCommandHandler : IRequestHandler<DeleteTagCommand>
{
    private readonly DataContext _context;

    public DeleteTagCommandHandler(DataContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteTagCommand request, CancellationToken cancellationToken)
    {
        var tag = await _context.Tags.FindAsync(request.Id);
        _context.Tags.Remove(tag);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}