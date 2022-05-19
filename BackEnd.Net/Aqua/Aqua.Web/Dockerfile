FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Aqua.Web.csproj", "."]
RUN dotnet restore "./Aqua.Web.csproj"
COPY . .
RUN dotnet build "Aqua.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Aqua.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Aqua.Web.dll"]
