define([
        'vendor/underscore',
        'lib/frame',
        'lib/fpi'
    ], function(_, Frame, FPI) {
        var Dispatcher = function(vm) {
            this.vm = vm;
        };

        // Push initial frames
        Dispatcher.prototype.initialize = function() {
            // Push application frame
            var appmeta = { name: "Application", base: 0, localNames: [] };
            this.pushFrame(new Frame(new FPI(appmeta)));

            // Push pseudo-main frame
            this.pushFrame(new Frame(this.createFPI(0)));
        };
        
        // Push new activation frame
        Dispatcher.prototype.pushFrame = function(frame) {
            this.vm.callStack.push(frame);
            this.vm.currentFrame = frame;
            this.vm.stack = frame.stack;
            this.vm.FPIstack = frame.FPIstack;
        };
        
        // Pop top activation frame
        Dispatcher.prototype.popFrame = function() {
            var prevFrame = this.vm.callStack.pop();
            this.vm.currentFrame = this.vm.callStack.peek();
            this.vm.stack = this.vm.currentFrame.stack;
            this.vm.FPIstack = this.vm.currentFrame.FPIstack;
            return prevFrame;
        };
        
        // Transfer control to new frame
        Dispatcher.prototype.functionCall = function(fpi, parameters) {
            var frame = new Frame(fpi, parameters);
            this.pushFrame(frame);
            frame.pc--;
        };
        
        // Transfer control back to previous frame
        Dispatcher.prototype.functionReturn = function() {
            var frame = this.popFrame();
            this.vm.stack.push(frame.stack.pop());
            // TODO: assert that frame.stack is empty
        };

        Dispatcher.prototype.createFPI = function(functionNameOrId, numParameters) {
            var meta;
            if (_.isString(functionNameOrId)) {
                meta = this.vm.prog.getFunctionByName(functionNameOrId);
            } else {
                meta = this.vm.prog.getFunctionById(functionNameOrId);
            }

            if (meta === undefined)
                return undefined;

            return new FPI(meta, numParameters);
        };
        
        return Dispatcher;
    }
);
