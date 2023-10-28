let api = 'http://0.0.0.0:4000'

if (process.env.NODE_ENV === 'production') {
    api = 'https://communa.network';
}

export const API_HOST = api;
export const APP_NAME = 'Web3 Freelance Jobs';
export const APP_TITLE = 'communa.network';
export const TINYMCE_KEY = 'teqsytcw012x616ha2tnna7m814gzz1pwhrp1hj5rxtov90k';
export const WALLET_CONNECT_PROJECT_ID = 'f72f23676636bdae1b917bd2da168a95';

export const ROUTER_ADDRESS = '0x51F7e80D725309b519E5538F993C5B3a6694C647';
export const TOKEN_ADDRESS = '0x86C948f06AAF9dF1199dF9539Ec3E56FbeE23CA9';
export const COMMUNA_WALLET_ADDRESS = '0x86C948f06AAF9dF1199dF9539Ec3E56FbeE23CA9';

export const FAQ_TOPICS = [
    'How can I publish a job on Communa?',
    'Is it free to publish a job on Communa?',
    'How can I join Communa as a freelancer?',
    'How can I apply for a job on Communa?',

    'What is Communa TimeTracker?',
    'Why do I need to use Communa TimeTracker?',

    'How do I get paid for my work as a freelancer?',

    'Explain me, what Communa Token is about?',
    'What is the purpose of Communa Token?',
    'How can I obtain Communa Tokens?',

    'How does reputation work on Communa?',
    'Can the community contribute to Communa\'s development?'
];

export const FAQ_TEXTS = [
    'Publishing a job on Communa is a straightforward process. As a client, you can create an account on the platform and navigate to the job posting section. Fill in the required details such as job title, description, required skills, duration, and budget. Once you have provided all the necessary information, you can publish the job and make it visible to freelancers on the platform.',
    'Yes, publishing a job on Communa is free of charge. You can post your job and attract talented freelancers without incurring any fees. However, keep in mind that there might be transaction fees associated with payments and other financial transactions on the blockchain network.',
    'Joining Communa as a freelancer is simple - an account on the platform though MetaMask or any other wallet. Once your account is created, you can set up your profile, including details about your skills, experience, and portfolio. This will help potential clients assess your suitability for their projects.',
    'No, there are no fees associated with applying for jobs on Communa. You can freely browse and apply for the available job opportunities without incurring any charges. However, it\'s important to note that once you successfully secure a job and receive payment, there might be transaction fees associated with the financial transactions on the blockchain network.',

    'Communa TimeTracker is a built-in application within the Communa platform that allows freelancers and clients to track the time spent on a project accurately. It is a tool designed to streamline time management and ensure transparency in the freelancing process.    ',
    'Communa TimeTracker offers several benefits for both freelancers and clients. Here\'s why you might find it useful: 1. Accurate Time Tracking: The TimeTracker enables freelancers to log their working hours precisely, providing an accurate record of the time spent on a project. This helps in fair invoicing and ensures that clients are billed appropriately. 2. Transparent Billing: With the TimeTracker, clients can monitor the progress of a project in real - time and have visibility into how their budget is being utilized.This transparency builds trust between freelancers and clients. 3. Efficient Project Management: The TimeTracker assists both freelancers and clients in managing project timelines effectively. It helps freelancers stay organized by tracking their work hours, deadlines, and milestones.Clients can also monitor the progress of the project and ensure timely completion. 4. Simplified Invoicing: By using the TimeTracker, freelancers can generate accurate invoices based on the tracked hours. This simplifies the invoicing process and reduces the chances of disputes related to billing.',

    'As a freelancer on the Communa platform, you will receive payment for your work directly through the blockchain. Here\'s how the payment process works: 1. Agreement: First, you and your client will establish the terms of your agreement, including the scope of work, deliverables, and payment details. This agreement will be recorded as a smart contract on the blockchain. 2. Time Tracking: Once you start working on the project, you will use the built-in time tracking feature on the Communa platform to record the hours you spend on the project. This information is stored securely on the blockchain. 3. Invoicing: Based on the tracked hours, you can generate an invoice using the platform\'s invoicing tool. The invoice will include the agreed-upon hourly rate and the total amount due. 4. Payment: The client will review the invoice and make the payment directly through the blockchain using cryptocurrency or any other supported payment method. The payment is sent to your wallet address associated with your Communa account. 5. Funds Withdrawal: Once the payment is received in your wallet, you can withdraw the funds to your preferred bank account or digital wallet.',

    'Communa Token is the utility token of Communa platform that operates on the blockchain network, specifically on the Ethereum a-like blockchain. The token serves as a medium of exchange within the platform and facilitates various transactions and interactions between freelancers, clients, and the ecosystem.',
    'The Communa Token has multiple purposes and use cases within the platform: 1. Payment: Freelancers can receive payments for their services in Communa Tokens from clients. This allows for seamless and secure transactions between parties without relying on traditional banking systems. 2. Rewards and Incentives: Communa Tokens can be used as rewards and incentives to encourage freelancers to deliver high-quality work, meet project milestones, or achieve certain performance metrics. Clients can offer these tokens as bonuses or additional compensation to motivate freelancers. 3. Platform Governance: Holders of Communa Tokens may have the ability to participate in the decision-making processes related to platform governance. This can include voting on proposed changes, protocol upgrades, or other community-related matters. 4. Access to Premium Features: Communa Tokens may grant access to exclusive features or premium services within the platform. This can provide additional benefits and privileges to token holders.',
    'Communa Tokens can be obtained through various means, including: 1. Purchasing them on supported cryptocurrency exchanges where the token is listed. 2. Earning them as payment for freelance services rendered on the Communa platform. 3. Participating in token airdrop conducted by Communa, if applicable. It\'s important to note that the availability and specific methods of obtaining Communa Tokens may vary, so it\'s recommended to refer to official announcements and guidelines provided by the Communa team for accurate information.',

    'Communa utilizes blockchain-based reputation systems to verify the authenticity of freelancers profiles and work history. By publishing job contracts as non-fungible tokens (NFTs) on the blockchain, users can reference time tracking, invoices, and payments. This decentralized reputation system allows freelancers to have full control over their reputation and achievements, independent of any centralized authority.',
    'Yes, Communa is an open-source platform, and the development process is open to the community. Interested individuals can join the project on GitHub and contribute to the creation of this new freelancing platform.',
];

export const JOB_KEYWORDS = [
    'Rust',
    'React',
    'Solidity',
    'TypeScript',
    'Ethereum',
    'Web3',
];