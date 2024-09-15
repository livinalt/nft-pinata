import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GenesisModule = buildModule("GenesisModule", (m) => {
  const initialOwner = "0xBeEF7C26f0804d099f49533a477809cF08c45aC2";

  const genesis = m.contract("Genesis", [initialOwner]);

  return { genesis };
});

export default GenesisModule;
