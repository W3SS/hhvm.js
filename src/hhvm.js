require.config({
    shim: {
        'vendor/underscore': { exports: '_' }
    }
});

define([
        'vendor/underscore',
        'lib/util/binary',
        'lib/instruction_set',
        'lib/stack'
    ], function(_, binaryUtil, InstructionSet, Stack) {
        var Hhvm = function(options) {
            this.options = _.defaults(options, {
                // Default output handler: just append to an internal string
                outputHandler: function(str) {
                    this.output += str;
                }
            });
            
            // Implementation of the HipHop bytecode instruction set
            this.hhbc = new InstructionSet(this);
            
            this.running = false;
            
            // I/O
            this.output = "";
            this.outputHandler = _.bind(this.options.outputHandler, this);
            
            // Registers, memory
            this.prog = [];
            this.pc = 0;
            this.stack = new Stack();
        };
        
        // Set the program code to execute
        Hhvm.prototype.program = function(program) {
            this.prog = program;
        };
        
        // Get the next instruction argument in the program, and increment the program counter
        Hhvm.prototype.arg = function(type) {
            var arg;
            var prog = this.prog;
            var pc = this.pc;
            
            if (type === 'int') {
                var bytes8 = prog.slice(pc + 1, pc + 9);
                arg = binaryUtil.decodeInt64(bytes8);
                this.pc += 8;
            } else if (type === 'double') {
                var bytes8 = prog.slice(pc + 1, pc + 9);
                arg = binaryUtil.decodeDouble(bytes8);
                this.pc += 8;
            } else if (type === 'litstr') {
                //TODO
            } else if (type === 'array') {
                //TODO
            } else {
                // Fallback: get one byte
                arg = prog[pc + 1];
                this.pc += 1;
            }
            
            return arg;
        };
        
        // Execute the next instruction
        Hhvm.prototype.step = function() {
            var opcode = this.prog[this.pc];
            
            var instr = this.hhbc.byOpcode(opcode);
            if (!instr) {
                this.error("No such opcode: " + opcode);
                return;
            }
            
            // For each formal argument of the function, get one argument from the program
            var args = _.map(_.range(instr.arity), _.bind(this.arg, this));
            
            // Execute the instruction
            instr.apply(this, args);
            
            // Move the program counter to the next instruction
            this.pc += 1;
        };
        
        Hhvm.prototype.print = function(str) {
            this.outputHandler(str);
        };
        
        Hhvm.prototype.error = function(message) {
            this.print("\nERROR: " + message);
            this.stop();
        };
        
        Hhvm.prototype.stop = function() {
            this.running = false;
        };
        
        Hhvm.prototype.run = function() {
            this.running = true;
            
            while (this.running && this.pc < this.prog.length) {
                this.step();
            }
            
            this.running = false;
        };
        
        return Hhvm;
    }
);
