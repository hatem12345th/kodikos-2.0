# Use the .NET SDK image, as it contains the tools needed to run the app
FROM mcr.microsoft.com/dotnet/sdk:9.0

# Set the working directory inside the container
WORKDIR /src

# Copy the project file and restore dependencies. This is cached for faster builds.
COPY InviceAutomation.csproj .
RUN dotnet restore

# Copy the rest of your application's source code
COPY . .

# Expose the ports your application listens on
EXPOSE 5104
# You can keep or remove the 7034 expose, it doesn't hurt
EXPOSE 7034

# The command to run your application when the container starts
# REMOVED the --urls argument from here
ENTRYPOINT ["dotnet", "run"]