import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Program } from "../target/types/program";

describe("program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const dataAccount = anchor.web3.Keypair.generate();
  const wallet = provider.wallet;

  const program = anchor.workspace.Program as Program<Program>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.new(wallet.publicKey)
      .accounts({ dataAccount: dataAccount.publicKey })
      .signers([dataAccount]).rpc();
    console.log("Your transaction signature", tx);

    const val1 = await program.methods.get()
      .accounts({ dataAccount: dataAccount.publicKey })
      .view();

    console.log("state", val1);

    await program.methods.flip()
      .accounts({ dataAccount: dataAccount.publicKey })
      .rpc();

    const val2 = await program.methods.get()
      .accounts({ dataAccount: dataAccount.publicKey })
      .view();

    console.log("state", val2);  });
});
