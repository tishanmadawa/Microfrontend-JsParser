import { UnaryOpNode, ParrellelApprovalNode, SequentialApprovalNode, ApproverNode } from "./Node.js"
import { ApprovalType, TokenType, UserType } from "./type.js"

export class evaluate {
    constructor(returnObject) {
        this.returnObject = returnObject;
    }

    Expression(node) {
        if (node instanceof UnaryOpNode) {
            if (node.opTok.type == TokenType.ADD) {
                switch (node.node.tok.type) {
                    case ApprovalType.SequentialApproval:
                        var token = node.node.tok;
                        var seqApproval = new SequentialApprovalNode(token.value, token.type);
                        var seqApprovalJson = JSON.stringify(seqApproval);
                        this.returnObject[seqApproval.level] = JSON.parse(seqApprovalJson);
                        break;
                    case ApprovalType.ParallelApproval:
                        var token = node.node.tok;
                        var seqApproval = new ParrellelApprovalNode(token.value, token.type);
                        var seqApprovalJson = JSON.stringify(seqApproval);
                        this.returnObject[seqApproval.level] = JSON.parse(seqApprovalJson);
                        break;
                    case UserType.Approver:
                        var token = node.node.tok;
                        var approval = new ApproverNode(token.value);
                        var seqApprovalJson = JSON.stringify(approval);
                        if (this.returnObject[token.level].type == ApprovalType.SequentialApproval) {
                            this.returnObject[token.level].approver = JSON.parse(seqApprovalJson);
                        } else {
                            var approverArray = this.returnObject[token.level].approver;
                            approverArray.push(JSON.parse(seqApprovalJson));
                            console.log(approverArray);
                            this.returnObject[token.level].approver = approverArray;
                        }
                        break;
                    default:
                        null
                        break;
                }
            }
        }


        return this.returnObject;
    }
}