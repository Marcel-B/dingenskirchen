FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:3088

EXPOSE 3088

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

COPY *.sln .
COPY Aqua.Api/*.csproj  Aqua.Api/
COPY Aqua.Application/*.csproj  Aqua.Application/
COPY Aqua.MongoDb/*.csproj  Aqua.MongoDb/
COPY Aqua.Domain/*.csproj  Aqua.Domain/
COPY Aqua.Web/*.csproj  Aqua.Web/
RUN dotnet restore

# copy everything else and build app
COPY Aqua.Api/ ./Aqua.Api/
COPY Aqua.Application/ ./Aqua.Application/
COPY Aqua.MongoDb/ ./Aqua.MongoDb/
COPY Aqua.Domain/ ./Aqua.Domain/
COPY Aqua.Web/ ./Aqua.Web/

RUN dotnet build "Aqua.Api/Aqua.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Aqua.Api.dll"]

# docker build -f AquaApi.Dockerfile -t millegalb/aqua.api:0.0.5 .
# docker run --rm --name api -p 3088:3088 millegalb/aqua.api:0.0.5