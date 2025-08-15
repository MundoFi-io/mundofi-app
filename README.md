# MundoFi 🌍

**Build real-world trust through transparent financial reporting**

MundoFi is a financial trust platform that enables users to generate verifiable crypto savings reports for real-world applications (loans, credit, rentals). By combining goal-based savings with transparent blockchain reporting, users build financial credibility while maintaining self-custody of their assets. Built for the Coinbase CDP Grant program.
<img width="1280" height="640" alt="Github" src="https://github.com/user-attachments/assets/cd1a9a64-6861-4996-ae74-dab3a35ef6c1" />

## ✨ Core Features

- **📋 Financial Trust Reports**: Generate verifiable savings reports for real-world applications (loans, credit checks, rentals)
- **🤝 Trust-Building Platform**: Transparent blockchain-based financial history for building credibility
- **🎯 Goal-Based Savings**: Set and track financial goals that feed into your trust profile
- **🔐 Self-Custody Wallets**: Maintain full control while building verifiable financial history
- **📊 Progress Tracking**: Visual indicators and activity history for trust verification
- **🌐 Multi-Chain Support**: Built on Coinbase's CDP platform for maximum compatibility
- **💼 Wallet Integration**: Connect existing wallets or create new ones seamlessly
- **📱 Native Mobile Experience**: Polished React Native app with smooth animations

## 🛠 Tech Stack

- **Frontend**: React Native + Expo
- **Styling**: NativeWind (Tailwind CSS for React Native)  
- **State Management**: Zustand
- **Web3 Integration**: Coinbase CDP SDK
- **Wallet SDK**: Coinbase Wallet Mobile SDK
- **Charts**: Victory Native
- **Typography**: Geist Font Family
- **Platform**: iOS & Android

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MundoFi-io/MundoFi.git
   cd MundoFi
   ```

2. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code for physical device testing

### Environment Setup

For full functionality, you'll need:
- Coinbase CDP API credentials (for production)
- EAS development build (for native features on devices)

## 📱 App Screens

- **Welcome Screen**: Onboarding with wallet creation/connection options
- **Dashboard**: Overview of savings goals and wallet balance
- **Goals**: Create and manage savings goals that build your trust profile
- **Activity**: Transaction history and goal progress for verification
- **Trust**: Financial reports and credibility metrics for real-world applications
- **Wallet**: Secure wallet management and connection flows

## 🎨 Design System

MundoFi uses a centralized theme system located in `src/styles/theme.ts`:

- **Colors**: Dark theme with blue (#3D7EFF) and green (#0CE98A) accents
- **Typography**: Geist font family (Light, Regular, Medium)
- **Components**: Reusable UI components with consistent styling

## 📦 Project Structure

```
app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # App screens
│   ├── navigation/     # Navigation configuration
│   ├── styles/         # Theme and styling
│   ├── lib/           # Utilities and integrations
│   └── types/         # TypeScript definitions
├── assets/            # Images, fonts, and static files
└── app.json          # Expo configuration
```

## 🤝 Contributing

This project was created for the Coinbase CDP Grant application. 

### Development Notes
- Uses EAS development builds for native module testing
- Includes mock implementations for Expo Go compatibility
- Follows React Native best practices with TypeScript

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Coinbase CDP**: For providing the Web3 infrastructure
- **Expo Team**: For the amazing React Native development platform
- **React Native Community**: For the open-source libraries and tools

---

*Built with ❤️ for the Coinbase CDP Grant Program*
