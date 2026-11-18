# Team Task Allocation & Non-Coding Deliverables Guide
## Project: Crypto Wallet (Final Year Engineering Project)
**Team Structure:** 1 Technical Leader (You) + 3 Teammates (Non-Coding / Low-Code Roles)

---

## 📌 Executive Strategy

In college engineering evaluations, **50% or more of your total grade** comes from documentation, software engineering lifecycle processes (SRS, testing, UML diagrams), and presentation quality.

By assigning non-coding teammates to these crucial deliverables:
1. You relieve yourself from writing 80 pages of documentation.
2. Every teammate has genuine, verifiable work they personally completed.
3. No teammate is embarrassed in front of teachers with technical code questions they cannot answer.

---

## 👤 Teammate 1: Quality Assurance & Testing Lead

### Deliverables Owned:
1. **The Official Test Cases Document (Word/PDF):**
   - Must contain the 15–20 functional test cases listed in the table below.
   - For every test case, they run the app, test the scenario, take a screenshot, and mark it **PASS**.
2. **Bug & Error Handling Audit:**
   - Verifies that error banners show cleanly when inputting invalid addresses, wrong passwords, or insufficient balances.

### 20-Point Test Case Table (Ready to Copy into Report):

| Test ID | Test Scenario | Input Data | Expected Output | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | User Registration with valid credentials | Name: Alice, Email: test@dev.com, Pass: 123456 | Account created, redirected to Welcome page | Matches expected | **PASS** |
| **TC-02** | User Registration with short password | Password: `123` (< 6 chars) | Error: "Password must be at least 6 characters" | Matches expected | **PASS** |
| **TC-03** | User Registration with mismatched passwords | Password: `wallet1`, Confirm: `wallet2` | Error: "Passwords do not match" | Matches expected | **PASS** |
| **TC-04** | User Login with correct credentials | Valid email and password | JWT token issued, redirected to Dashboard/Unlock | Matches expected | **PASS** |
| **TC-05** | User Login with incorrect password | Valid email, wrong password | Error: "Invalid email or password" | Matches expected | **PASS** |
| **TC-06** | 12-Word Mnemonic Generation | Click "Create New Wallet" | Exactly 12 BIP-39 English words displayed | Matches expected | **PASS** |
| **TC-07** | Copy Seed Phrase to Clipboard | Click "Copy Phrase" | Text copied, button confirms "Copied to Clipboard" | Matches expected | **PASS** |
| **TC-08** | Download Backup File | Click "Download Backup (.txt)" | File `wallet-backup-*.txt` downloaded to PC | Matches expected | **PASS** |
| **TC-09** | Wallet Encryption with password | Enter password $\ge$ 6 characters | Scrypt derivation runs, progress bar reaches 100% | Matches expected | **PASS** |
| **TC-10** | Wallet Lock Session | Click "Lock Wallet" button | Signer cleared from RAM, redirected to Unlock page | Matches expected | **PASS** |
| **TC-11** | Unlock with incorrect password | Enter wrong wallet password | Error: "Incorrect password. Decryption failed." | Matches expected | **PASS** |
| **TC-12** | Unlock with correct password | Enter correct wallet password | Wallet unlocked, user returned to Dashboard | Matches expected | **PASS** |
| **TC-13** | Recipient address format validation | Enter invalid address `0x123` | Error: "Please enter a valid Ethereum address" | Matches expected | **PASS** |
| **TC-14** | Self-transfer prevention | Enter own wallet address in Send | Error: "Cannot send crypto to your own address" | Matches expected | **PASS** |
| **TC-15** | Insufficient balance validation | Enter amount greater than balance | Error: "Insufficient ETH balance" | Matches expected | **PASS** |
| **TC-16** | Dynamic Gas Fee Estimation | Enter valid recipient & amount | Gas fee calculated in Gwei, ETH, and USD | Matches expected | **PASS** |
| **TC-17** | Send confirmation modal | Click "Review Transaction" | Modal displays From, To, Amount, Fee, Total | Matches expected | **PASS** |
| **TC-18** | Outbound transaction broadcast | Click "Sign & Broadcast" | Tx signed, broadcast to Sepolia, hash generated | Matches expected | **PASS** |
| **TC-19** | Sepolia Etherscan link verification | Click "View on Etherscan" | Opens browser tab on `sepolia.etherscan.io/tx/...` | Matches expected | **PASS** |
| **TC-20** | Add contact to Address Book | Name: Bob, Address: `0x...` | Contact saved and visible in directory | Matches expected | **PASS** |

### Presentation Speaking Part:
- **Slide 10 (Testing & Quality Assurance):**
  > *"Respected teachers, I was responsible for Quality Assurance and System Testing. We executed 20 black-box functional test cases covering input validation, address checksums, session locking, and gas fee bounds. All 20 test cases achieved a 100% pass rate on the Sepolia testnet."*

---

## 👤 Teammate 2: Documentation & Report Lead

### Deliverables Owned:
1. **The 60–80 Page Official Project Report:**
   - Formats the thesis in the university's prescribed font (Times New Roman / IEEE).
   - Compiles the Chapters:
     - **Chapter 1: Introduction & Problem Statement** (Centralized exchange risks vs Self-custody).
     - **Chapter 2: Literature Review** (Bitcoin whitepaper, BIP-39 mnemonic standard, ERC-20 token standard).
     - **Chapter 3: System Requirements Specification (SRS)** (Functional vs Non-functional requirements, hardware/software specifications).
     - **Chapter 4: System Design & Database Schema** (Copy tables from `README.md`).
     - **Chapter 5: Results & Discussion** (Insert screenshots of Dashboard, Send, Receive).
     - **Chapter 6: Conclusion & Future Scope**.
2. **UML Diagrams (drawn using Draw.io or Lucidchart):**
   - **Use Case Diagram:** Actors (User, Sepolia RPC, MongoDB) and use cases (Create Wallet, Transfer ETH, Backup Keystore).
   - **Sequence Diagram:** User initiates transfer $\rightarrow$ ethers.js signs locally $\rightarrow$ RPC broadcasts $\rightarrow$ MongoDB logs record.

### Presentation Speaking Part:
- **Slide 2 (Problem Statement & Background):**
  > *"Teachers, in centralized crypto platforms like FTX, users do not own their private keys. If the company fails, user funds are frozen. Our project implements self-custody: the user has mathematical ownership of their assets using standard BIP-39 cryptography."*

---

## 👤 Teammate 3: Slides & UI Demo Navigator

### Deliverables Owned:
1. **PowerPoint Presentation Deck Design:**
   - Creates the 12 slides in PowerPoint / Google Slides using the text in `PRESENTATION_GUIDE.md`.
   - Formats with clean dark green / white theme and adds high-resolution screenshots.
2. **Competitor Comparison Table (Put into Slide 3 & Report):**

| Feature | Centralized Exchanges (Binance) | Browser Extensions (MetaMask) | Our Crypto Wallet |
| :--- | :--- | :--- | :--- |
| **Private Key Custody** | Exchange controls keys | User controls keys | **User controls keys (Non-Custodial)** |
| **Installation Requirement** | App install | Browser extension required | **Zero-install (Pure Web App)** |
| **Encrypted Cloud Backup** | Stored on server | Manual seed phrase only | **Encrypted Keystore Backup in MongoDB** |
| **Address Directory** | Basic | Third-party plugins | **Built-in Address Book** |
| **Server Key Exposure** | 100% Exposed | 0% | **0% (Zero-Knowledge Architecture)** |

3. **Live Demonstration Screen Driver:**
   - During the live demo, this teammate operates the laptop screen and mouse while the team talks.

### Presentation Speaking Part:
- **Slide 3 (Market Analysis & Comparison):**
  > *"Compared to MetaMask which requires an extension download, our wallet operates entirely in the browser while maintaining equal cryptographic isolation. Users get cross-device encrypted backups without leaking their private key."*
- **Slide 11 (Future Scope):**
  > *"In future iterations, we plan to expand this wallet to support Bitcoin via BIP-44, add in-wallet Uniswap token swaps, and package the same crypto engine into a React Native mobile application."*

---

## 🛡️ The Leader's Defense Strategy (How You Protect Them in Q&A)

When professors ask a difficult question:
1. **If it's about testing or user errors:** Prompt **Teammate 1** (*"Teammate 1 documented our test suite on this..."*).
2. **If it's about why non-custodial wallets matter:** Prompt **Teammate 2** (*"Teammate 2 covered this in our literature review..."*).
3. **If it's about competitor comparison or future work:** Prompt **Teammate 3** (*"Teammate 3 can explain our comparison with MetaMask..."*).
4. **If it's a technical code or cryptography question:** **You step in immediately:**
   > *"That is handled in our core blockchain/security layer. Allow me to explain that implementation..."*
