import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Niftypay } from '../target/types/niftypay';

describe('niftypay', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Niftypay as Program<Niftypay>;

  it('verify_nft', async () => {
    // Add your test here.
    const tx = await program.rpc.verify_nft({});
    console.log("confirmed", tx);
  });
});
