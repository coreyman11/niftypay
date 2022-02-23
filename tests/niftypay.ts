import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Niftypay } from '../target/types/niftypay';
import * as assert from "assert";

describe('niftypay', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Niftypay as Program<Niftypay>;

  // it('verify_nft', async () => {
  //   // Add your test here.
  //   const tx = await program.rpc.verifyNft({});
  //   console.log("confirmed", tx);
  // });

  it('can create a new project', async () => {
    // Call the "SendTweet" instruction.
    const creator = program.provider.wallet.publicKey;
    const project = anchor.web3.Keypair.generate();
    const nftAddress = anchor.web3.Keypair.generate();
    const member1 = anchor.web3.Keypair.generate();
    await program.rpc.createProject('Magnum Opus', nftAddress.publicKey, [member1.publicKey], {
      accounts: {
        project: project.publicKey,
        creator,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [project],
    });

    // Fetch the account details of the created project.
    const projectAccount = await program.account.project.fetch(project.publicKey);

    // Ensure it has the right data.
    assert.equal(projectAccount.creator.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(projectAccount.members[0].toBase58(), member1.publicKey.toBase58());
    assert.equal(projectAccount.name, 'Magnum Opus');
  });
  it('can create a new benefit', async () => {
    const project = anchor.web3.Keypair.generate();
   
    const benefit = anchor.web3.Keypair.generate();
    const business_owner = anchor.web3.Keypair.generate();
    
    await program.rpc.createBenefit(
      project.publicKey,
      "Cozy Cafe 20%",
      { freebie: {} },
      { oneTime: {} },
      2,
      20,
      business_owner.publicKey, {
      accounts: {
        benefit: benefit.publicKey,
        creator: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [benefit],
    });

    // Fetch the account details of the created project.
    const benefitAccount = await program.account.benefit.fetch(benefit.publicKey);

    const [benefitAccount2] = await program.account.benefit.all([
      {
        memcmp: {
          offset: 8,
          bytes: project.publicKey.toBase58(),
        }
      },
      {
        memcmp: {
          offset: 40,
          bytes: project.publicKey.toBase58(),
        }
      }
    ]);


    // // Ensure it has the right data.
    assert.equal(benefitAccount.creator.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(benefitAccount2.account.creator.toBase58(), program.provider.wallet.publicKey.toBase58());
    // assert.equal(projectAccount.name, 'Cozy Cafe 20%');
  });

});
