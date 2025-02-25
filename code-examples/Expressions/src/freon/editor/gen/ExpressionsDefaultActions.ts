// Generated by the Freon Language Generator.
import * as Keys from "@freon4dsl/core";
import {
    AFTER_BINARY_OPERATOR,
    BEFORE_BINARY_OPERATOR,
    Box,
    MetaKey,
    FreCombinedActions,
    FreCreateBinaryExpressionAction,
    FreCaret,
    FreCustomAction,
    FreEditor,
    FreNode,
    FreBinaryExpression,
    FreKey,
    FreLogger,
    FreTriggerType,
    ActionBox,
    OptionalBox,
    FreNodeReference,
    LEFT_MOST,
    RIGHT_MOST,
} from "@freon4dsl/core";

import {
    Type,
    Expression,
    NumberLiteralExpression,
    BinaryExpression,
    MultiplyExpression,
    PlusExpression,
    MinusExpression,
    DivideExpression,
    Function,
    Parameter,
    ParameterRef,
    FunctionCallExpression,
    ExpressionUnit,
} from "../../language/gen/index.js";

/**
 * This module implements the actions available to the user in the editor.
 * These are the default actions. They are merged with the default and
 * custom editor parts in a three-way manner. For each modelelement,
 * (1) if a custom build creator/behavior is present, this is used,
 * (2) if a creator/behavior based on the editor definition is present, this is used,
 * (3) if neither (1) nor (2) yields a result, the default is used.
 */
export const BINARY_EXPRESSION_CREATORS: FreCreateBinaryExpressionAction[] = [
    FreCreateBinaryExpressionAction.create({
        trigger: "*",
        activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
        expressionBuilder: (box: Box, trigger: FreTriggerType, editor: FreEditor) => {
            const parent = box.node;
            const newExpression = new MultiplyExpression();
            parent[(box as ActionBox).propertyName] = newExpression;
            return newExpression;
        },
    }),
    FreCreateBinaryExpressionAction.create({
        trigger: "+",
        activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
        expressionBuilder: (box: Box, trigger: FreTriggerType, editor: FreEditor) => {
            const parent = box.node;
            const newExpression = new PlusExpression();
            parent[(box as ActionBox).propertyName] = newExpression;
            return newExpression;
        },
    }),
    FreCreateBinaryExpressionAction.create({
        trigger: "-",
        activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
        expressionBuilder: (box: Box, trigger: FreTriggerType, editor: FreEditor) => {
            const parent = box.node;
            const newExpression = new MinusExpression();
            parent[(box as ActionBox).propertyName] = newExpression;
            return newExpression;
        },
    }),
    FreCreateBinaryExpressionAction.create({
        trigger: "/",
        activeInBoxRoles: [LEFT_MOST, RIGHT_MOST, BEFORE_BINARY_OPERATOR, AFTER_BINARY_OPERATOR],
        expressionBuilder: (box: Box, trigger: FreTriggerType, editor: FreEditor) => {
            const parent = box.node;
            const newExpression = new DivideExpression();
            parent[(box as ActionBox).propertyName] = newExpression;
            return newExpression;
        },
    }),
];

export const CUSTOM_ACTIONS: FreCustomAction[] = [];
