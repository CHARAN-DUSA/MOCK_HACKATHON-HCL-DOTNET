FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files
COPY ["ContactApp.API.csproj", "./"]
COPY ["../ContactApp.Core/ContactApp.Core.csproj", "../ContactApp.Core/"]
COPY ["../ContactApp.Infrastructure/ContactApp.Infrastructure.csproj", "../ContactApp.Infrastructure/"]

RUN dotnet restore "ContactApp.API.csproj"

# Copy everything
COPY . .
WORKDIR "/src"
RUN dotnet publish "ContactApp.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ContactApp.API.dll"]