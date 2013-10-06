define([
    ], function() {
      return [
            { mnemonic: "LowInvalid" },
            // 1. Basic instructions
            { mnemonic: "Nop" },
            { mnemonic: "PopC" },
            { mnemonic: "PopV" },
            { mnemonic: "PopR" },
            { mnemonic: "Dup" },
            { mnemonic: "Box" },
            { mnemonic: "Unbox" },
            { mnemonic: "BoxR" },
            { mnemonic: "UnboxR" },

            // 2. Literal and constant instructions
            { mnemonic: "Null" },
            { mnemonic: "True" },
            { mnemonic: "False" },
            { mnemonic: "NullUninit" },
            { mnemonic: "Int" },
            { mnemonic: "Double" },
            { mnemonic: "String" },
            { mnemonic: "Array" },
            { mnemonic: "NewArray" },
            { mnemonic: "NewPackedArray" },
            { mnemonic: "AddElemC" },
            { mnemonic: "AddElemV" },
            { mnemonic: "AddNewElemC" },
            { mnemonic: "AddNewElemV" },
            { mnemonic: "NewCol" },
            { mnemonic: "ColAddElemC" },
            { mnemonic: "ColAddNewElemC" },
            { mnemonic: "Cns" },
            { mnemonic: "CnsE" },
            { mnemonic: "CnsU" },
            { mnemonic: "ClsCns" },
            { mnemonic: "ClsCnsD" },

            // 3. Operator instructions
            { mnemonic: "Print" },

            // 4. Control flow instructions
            //TODO
            // 5. Get instructions
            //TODO
            // 6. Isset, Empty and type querying instructions
            //TODO
            // 7. Mutator instructions
            //TODO
            // 8. Call instructions
            //TODO
            // 9. Member operations
            //TODO
            // 10. Member instructions
            //TODO
            // 11. Iterator instructions
            //TODO
            // 12. Include, eval, and define instructions
            //TODO
            // 13. Miscellaneous instructions
            //TODO
            // 14. Continuation creation and execution
            //TODO
      ]
    }
);
