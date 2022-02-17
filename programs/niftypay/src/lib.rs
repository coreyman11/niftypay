use anchor_lang::prelude::*;


declare_id!("Ebvmd8rJHgmZ5Y3UdEBmGBHBEH2hbaRmEmzpZcRTYQ2f");

#[program]
pub mod niftypay {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}


//Creating a base account for the program to be stored in. We can rename and rework structure
#[account]
pub struct niftypaymain {
    pub owner: Pubkey,
    pub authority: Pubkey,
}
