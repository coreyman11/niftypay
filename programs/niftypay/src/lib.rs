use anchor_lang::prelude::*;
use anchor_spl::token::{TokenAccount, Mint };
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
    pub fn create_project(ctx: Context<CreateProject>, name: String, contract_id: Pubkey, members: Vec<Pubkey>) -> ProgramResult {
        let project: &mut Account<Project> = &mut ctx.accounts.project;
        let creator: &Signer = &ctx.accounts.creator;

        if name.chars().count() > 50 {
            return Err(ErrorCode::NameTooLong.into())
        }

        project.contract_id = contract_id;
        project.creator = *creator.key;
        project.name = name;
        project.members = members;

        Ok(())
    }
    pub fn create_benefit(ctx: Context<CreateBenefit>, project_id: Pubkey, name: String, benefit_type: BenefitType, frequency: Frequency, allowed_usage: u8, discount: u8, business_owner: Pubkey,) -> ProgramResult {
        let benefit: &mut Account<Benefit> = &mut ctx.accounts.benefit;
        let creator: &Signer = &ctx.accounts.creator;
        let clock: Clock = Clock::get().unwrap();

        if name.chars().count() > 50 {
            return Err(ErrorCode::NameTooLong.into())
        }

        benefit.creator = *creator.key;
        benefit.timestamp = clock.unix_timestamp;
        benefit.project_id = project_id;
        benefit.name = name;
        benefit.benefit_type = benefit_type;
        benefit.allowed_usage = allowed_usage;
        benefit.frequency = frequency;
        benefit.discount = discount;
        benefit.business_owner = business_owner;

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

#[derive(Accounts)]
pub struct CreateProject<'info> {
    #[account(init, payer = creator, space = Project::LEN)]
    pub project: Account<'info, Project>,
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CreateBenefit<'info> {
    #[account(init, payer = creator, space = Benefit::LEN)]
    pub benefit: Account<'info, Benefit>,
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub enum BenefitType {
    PercentageDiscount,
    AmountDiscount,
    Freebie,
    GiftCard,
    Entrance
}
#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub enum Frequency {
    OneTime,
    Monthly,
    Weekly
}

#[account]
pub struct Project {
    pub contract_id: Pubkey,
    pub creator: Pubkey,
    pub name: String,
    pub members: Vec<Pubkey>
}

#[account]
pub struct Benefit {
    pub project_id: Pubkey,
    pub creator: Pubkey,
    pub business_owner: Pubkey,
    pub name: String,
    pub benefit_type: BenefitType,
    pub allowed_usage: u8,
    pub frequency: Frequency,
    pub discount: u8,
    pub timestamp: i64,
}

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_BENEFIT_NAME_LENGTH: usize = 50 * 4; // 50 chars max.
const DISCOUNT_LENGTH: usize = 1;
const ALLOWED_USAGE_LENGTH: usize = 1;
const BENEFIT_TYPE_LENGTH: usize = 8;
const FREQUENCY_LENGTH: usize = 8;
const MAX_PROJECT_NAME_LENGTH: usize = 60 * 4; // 60 chars max.

impl Benefit {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // creator.
        + PUBLIC_KEY_LENGTH // business_owner.
        + PUBLIC_KEY_LENGTH // project_id.
        + TIMESTAMP_LENGTH // Timestamp.
        + ALLOWED_USAGE_LENGTH // Allowed usage.
        + DISCOUNT_LENGTH // Discount.
        + BENEFIT_TYPE_LENGTH
        + FREQUENCY_LENGTH
        + STRING_LENGTH_PREFIX + MAX_BENEFIT_NAME_LENGTH; // Benefit name.
}
impl Project {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // creator.
        + PUBLIC_KEY_LENGTH // Contract Id.
        + (8 * PUBLIC_KEY_LENGTH ) // members.
        + STRING_LENGTH_PREFIX + MAX_PROJECT_NAME_LENGTH; // Project Name.
}

#[error]
pub enum ErrorCode {
    #[msg("Error, Not verified")]
    VerifyNFT,
    #[msg("Provide a valid project name.")]
    NameNotValid,
    #[msg("The provided name should be 50 characters long maximum.")]
    NameTooLong,
}

//Links
//https://docs.metaplex.com/architecture/deep_dive/overview Link to the metaplex docs
//https://medium.com/metaplex/metaplex-metadata-standard-45af3d04b541 link to metaplex PDA structure
