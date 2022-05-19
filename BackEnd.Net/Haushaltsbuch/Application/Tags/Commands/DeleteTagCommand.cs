using System;
using MediatR;

namespace Application.Tags.Commands;

public class DeleteTagCommand : IRequest
{
    public Guid Id { get; set; }
}