import Head from 'next/head';

import { AboutPageWrapper } from 'src/lib/Wrappers';
import { APP_NAME } from 'src/config/consts';
import Header from 'src/lib/Layout/Header';

const About = () => {
  return (
    <AboutPageWrapper>
      <Head>
        <title>Software Engineering Jobs - {APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <div className="banner">
        <div className="middle">
          <h2>We are Communa</h2>
          <p>
            Web3 freelancing platform that connects businesses
            with talented professionals worldwide, making remote work more convenient than ever before.
          </p>
          <ul>
            <li>
              https://github.com/communa
            </li>
            <li>
              https://communa.network
            </li>
          </ul>
        </div>
      </div>
      <article>
        <h2>Freelancing</h2>
        <p>
          In the last decade, there was an explosion of freelancing resulting in millions of people now working as independent contractors. Advances in technology have made it possible to work remotely and connect workers and clients worldwide. As the world becomes more digital, freelancing is becoming an increasingly popular way of earning a living.

          This trend shows no signs of slowing down, having more companies turning to freelancers to fill their staffing needs. <strong>Freelancing now offers a level of flexibility and autonomy that traditional jobs simply cannot match.</strong>
        </p>

        <h2>Decentralisation</h2>
        <p>
          The technical importance of decentralization cannot be overstated, and we are excited to see how blockchain technology is transforming the world. Communa is made to operate borderless where unbiased smart contracts enable freelancers to work with clients directly, without the need for 3rd party services or any other intermediaries.

          Like numerous web2 freelancing platforms, Communa automates the needed business processes directly on the blockchain: time tracking, invoicing, payments, and reputation. Using blockchain we aim not only to reduce costs, and cut the needs for party systems but also to increase trust bringing <strong>a level of autonomy that has never been seen before.</strong>
        </p>


        <h2>Transparency</h2>
        <p>
          We are building Communa with a commitment to transparency and fairness, bringing a suite of tools and resources to help both clients and freelancers manage and truly own their work. With the sources available on GitHub, we <strong>invite the open-source community to join the development of a brand new freelancing platform.</strong>

          Our platform does operate on top of Ethereum, with smart contracts serve agreements between buyer and seller being directly written into lines of code. These lines of code give automation of processes happen on traditional freelancing platforms but give a greater trust and transparent way to store and transfer value. as all transactions and interactions are recorded on the blockchain and can be easily verified.

          Smart contracts let us automate complex processes involving time-tracking, invoicing, and payments resulting in fewer office operations and lower fees. An approach like this not only saves time and money but also <strong>provides a level of transparency that the traditional approach simply cannot give.</strong>
        </p>

        <h2>Reputation</h2>
        <p>
          We all know that a strong reputation is essential in a crowded market, where profiles on social networks like LinkedIn serve as a digital resume.

          Reputation built on blockchain is a new idea that is gaining popularity in the crypto community. The concept can be perfectly applied to freelancing market, be used to verify the authenticity of freelancers profiles and their work history similarly as we verify transitions on etherscan.

          With a job contract published as an NFT on the blockchain where metadata like hourly rate, date started and the references to all the time spent we achieve a system resistant to fraud where smart contracts will contain references to all-time-tracked, invoices, and payments.

          Decentralised reputation this can lead to an autonomous and tamper-proof system, where users could verify their credentials, work history without relying on any centralized authority. By that Communa will enable freelancers to have full control over their reputation, as users <strong>will be really owning their profiles and achievements.</strong>
        </p>

        <h2>Payments</h2>
        <p>
          Fast and reliable payments are crucial for contractors located across the globe with 100+ different currencies circulating. Blockchain networks and stablecoins like USDT and USDC offer the needed global accessibility both for businesses and freelancers, which is also faster, cheaper, and more independent than usual payments.

          We focus on Ethereum, Metamask, and TrustWallet as the most widely adopted technologies giving us access to major market share and the ability to send and receive payments in stablecoins out of the box. Our smart contracts automate all required processes related to time-tracking, paying, and invoicing in a frictionless manner, <strong>with money released to freelancers in USDT on a daily basis.</strong>
        </p>

        <h2>Business Inquiries</h2>
        <a
          href="https://docs.google.com/forms/d/1nBtimLYE6yHDixAnlNhJ2mcB7gzWwlMCXPCdTxGo6lE"
          target="_blank"
          rel="noreferrer"
        >
          https://docs.google.com/forms/d/1nBtimLYE6yHDixAnlNhJ2mcB7gzWwlMCXPCdTxGo6lE
        </a>
      </article >
    </AboutPageWrapper>
  );
};

export default About;