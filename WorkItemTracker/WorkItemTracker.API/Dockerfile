FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution file
COPY WorkItemTracker.sln ./

# Copy all projects relative to the context
COPY WorkItemTracker.API/ ./WorkItemTracker.API/
COPY WorkItemTracker.Application/ ./WorkItemTracker.Application/
COPY WorkItemTracker.Domain/ ./WorkItemTracker.Domain/
COPY WorkItemTracker.Infrastructure/ ./WorkItemTracker.Infrastructure/

# Restore
RUN dotnet restore WorkItemTracker.sln

# Build & publish API
RUN dotnet publish WorkItemTracker.API/WorkItemTracker.API.csproj -c Release -o /app/out

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 5000
ENTRYPOINT ["dotnet", "WorkItemTracker.API.dll"]