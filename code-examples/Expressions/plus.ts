
function evaluate(node): number {
	const leftValue = evaluate(node.left)
	const rightValue = evaluate(node.right)
	return leftValue + rightValue
}
