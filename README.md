![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

# Lucid

Your ultimate dream companion for recording, exploring, and enhancing your journey through the realm of dreams.

Lucid aims to provide users with a secure platform to capture and analyze their dreams. Leveraging the DataverseOS blockchain, we ensure the confidentiality and integrity of dream records, allowing users to maintain a private log (or make it public if they choose to) while exploring trends or patterns in their dreams.

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Features

- **Secure Blockchain Technology:** Utilizes DataverseOS blockchain for secure and immutable dream journaling.
- **User Authentication:** Allows users to create accounts and log in securely.
- **Dream Entry:** Enables users to record dreams with details such as date, description and emotions.
- **Responsive Design:** Built with React to ensure a responsive and user-friendly interface across devices.

## Tech Stack

- React
- TypeScript
- DataverseOS
- TailwindCSS
- shadcn/ui Components

## Installation

### 1.Prepare

Before running the project you need to install both `pnpm` and `create-dataverse-app` globally.

```bash
  # install pnpm
  npm install -g pnpm

  # install create-dataverse-app
  pnpm install -g create-dataverse-app
```

### 2.Clone the repository

```bash
  git clone https://github.com/almoloo/lucid.git
```

### 3.Install dependencies

```bash
  cd lucid && pnpm install
```

### 4.Start

```bash
  pnpm dev
```

Lucid has been successfully launched on your local network. Follow the address provided by the terminal.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_DREAM_VERSION`: 0.0.1

## Disclaimer

**Note:** This project was developed as a submission for the [Rebuild Ownership 2.0 Hackathon](https://dorahacks.io/hackathon/rebuild-ownership-2/detail) and is not intended for production use without further development and rigorous testing.

The code and functionalities presented in this repository were created within a limited time frame specifically for the hackathon. As such, it may contain bugs, incomplete features, or security vulnerabilities.

**Caution is advised** when using this codebase in a production environment or as a basis for a fully deployed application. It's recommended to review, enhance, and test the code thoroughly before considering it for any production-level implementation.

We appreciate your interest in this project and welcome contributions, feedback, or suggestions for improvements. Please proceed with caution and understanding of its hackathon-oriented context.

## Contributing

We welcome contributions from the community! Feel free to fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
