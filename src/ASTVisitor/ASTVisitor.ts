import Assignment from '../ASTNode/Assignment';
import DeclStmt from '../ASTNode/DeclStmt';
import Sequence from '../ASTNode/Sequence';
import NumericalLiteral from '../ASTNode/NumericalLiteral';
import StringLiteral from '../ASTNode/StringLiteral';
import VarExpr from '../ASTNode/VarExpr';
import PlusExpr from '../ASTNode/PlusExpr';


interface ASTVisitor {

    visitAssignment(assignment: Assignment): void;

    visitDeclStmt(declStmt: DeclStmt): void;

    visitSequence(sequence: Sequence): void;

    visitNumericLiteral(numericLiteral: NumericalLiteral): void;

    visitStringLiteral(stringLiteral: StringLiteral): void;

    visitPlusExpr(plusExpr: PlusExpr): void;

    visitVarExpr(varExpr: VarExpr): void;
}

export default ASTVisitor;
