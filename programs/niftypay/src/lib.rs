use anchor_lang::prelude::*;
use anchor_spl::token::{TokenAccount, Mint, Token,};
use std::str::FromStr;
use spl_token_metadata::state::Metadata;

declare_id!("Ebvmd8rJHgmZ5Y3UdEBmGBHBEH2hbaRmEmzpZcRTYQ2f");

#[program]
pub mod niftypay {
    use super::*;
    pub fn verify_nft(ctx: Context<VerifyNFT>) -> ProgramResult {

        let nft_token_account = &ctx.accounts.nft_token_account;
        let user = &ctx.accounts.user;
        let nft_mint_account = &ctx.accounts.nft_mint;

        //Check the owner of the token account
        assert_eq!(nft_token_account.owner,user.key());

        //Check the mint on the token account
        assert_eq!(nft_token_account.mint, nft_mint_account.key());

        //Check the amount on the token accounts (which is going to be 1 for right now becasue there is only 1?)
        assert_eq!(nft_token_account.amount,1);

        let nft_metadata_account = &ctx.accounts.nft_metadata_account;

        let nft_mint_account_pubkey = ctx.accounts.nft_mint.key();

        //Seeds for PDA --Prgram Derived address
        let metadata_seed = &[
            "metadata".as_bytes(),
            ctx.accounts.token_metadata_program.key.as_ref(),
            nft_mint_account_pubkey.as_ref(),
        ];

        //The derived key
        let (metadata_derived_key, _bump_seed) =
            Pubkey::find_program_address(
                metadata_seed,
                ctx.accounts.token_metadata_program.key
            );

        //Check that the derived key is the current metadata account key (which is the NFT spl token we are checking against to make sure the customer owns)
        assert_eq!(metadata_derived_key, nft_metadata_account.key());

        //Check if initialized
        if ctx.accounts.nft_metadata_account.data_is_empty() {
        };

        //Get the metadata account struct so we can access its values
        let metadata_full_account =
            &mut Metadata::from_account_info(&ctx.accounts.nft_metadata_account)?;

        let full_metadata_clone = metadata_full_account.clone();

        let expected_creator =
            Pubkey::from_str("4mgnTysrA7kQVYCsE2CJcaJzpX8xPxGPoKPz2LyiN782").unwrap();

        //Make sure expected creator is present in metadata
        assert_eq!(
            full_metadata_clone.data.creators.as_ref().unwrap()[0].address,
            expected_creator
        );

        if !full_metadata_clone.data.creators.unwrap()[0].verified {
            //Return some error as the expected creator is not verified
            //return Err(ErrorCode::AlreadyVerified.into()); //This needs to be fixed and routed
        };

        Ok(())
    }
}

#[derive(Accounts)]
pub struct VerifyNFT<'info> {

#[account(address = *program_id)]//The Program ID structre needs to get fixed as well. Should be something like metadata_program_ID
pub token_metadata_program: AccountInfo<'info>,

    //The owner of the NFT.. Aka the customer who owns the NFT
    pub user: Signer<'info>,

    //The mint account of the NFT. This is the mint account of the token program to make sure the NFT is really apart of the collection
    pub nft_mint: Account<'info, Mint>,

    //The token account that the user uses to hold the NFT
    pub nft_token_account: Account<'info, TokenAccount>,

    //The metadata account of the NFT
    pub nft_metadata_account: AccountInfo<'info>,
}

#[error]
pub enum ErrorCode {
    #[msg("Error, Not verified")]
    VerifyNFT,
}

//Links
//https://docs.metaplex.com/architecture/deep_dive/overview Link to the metaplex docs
//https://medium.com/metaplex/metaplex-metadata-standard-45af3d04b541 link to metaplex PDA structure
