define([
        'vendor/underscore',
    ], function(_) {
        return {
            Nop: function() {},
            PopC: function() {
                this.stack.pop();
            },
            PopV: function() {
                this.stack.pop();
            },
            PopR: function() {
                this.stack.pop();
            },
            Dup: function() {
                this.stack.push(this.stack.peek().clone());
            },
            Box: function() {
                this.stack.push(new Ref(this.stack.pop().clone()));
            },
            Unbox: function() {
                var top = this.stack.pop();
                this.stack.push(this.stack.pop().cell.clone());
            },
            BoxR: function() {
                if (!(this.stack.peek() instanceof Ref)) {
                    this.hhbc.Box();
                }
            },
            UnboxR: function() {
                if (!(this.stack.peek() instanceof Cell)) {
                    this.hhbc.Unbox();
                }
            }
        };
    }
);
