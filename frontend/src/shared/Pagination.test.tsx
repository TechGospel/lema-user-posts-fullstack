import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./pagination";

describe("Pagination Component", () => {
	const onPageChangeMock = jest.fn();

	const defaultProps = {
		currentPage: 1,
		totalPages: 10,
		onPageChange: onPageChangeMock,
		siblingCount: 1,
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the Previous button", () => {
		render(<Pagination {...defaultProps} />);
		expect(
			screen.getByRole("button", { name: /previous/i })
		).toBeInTheDocument();
	});

	it("renders the Next button", () => {
		render(<Pagination {...defaultProps} />);
		expect(
			screen.getByRole("button", { name: /next/i })
		).toBeInTheDocument();
	});

	it("disables the Previous button on the first page", () => {
		render(<Pagination {...defaultProps} currentPage={0} />);
		const previousButton = screen.getByRole("button", {
			name: /previous/i,
		});
		expect(previousButton).toBeDisabled();
	});

	it("disables the Next button on the last page", () => {
		render(<Pagination {...defaultProps} currentPage={9} />);
		const nextButton = screen.getByRole("button", { name: /next/i });
		expect(nextButton).toBeDisabled();
	});

	it("renders the correct page numbers", () => {
		render(<Pagination {...defaultProps} />);
		expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
	});

	it("renders ellipses when necessary", () => {
		render(<Pagination {...defaultProps} currentPage={5} />);
		expect(screen.getAllByText("...")).toHaveLength(2);
	});

	it("calls onPageChange when a page number is clicked", () => {
		render(<Pagination {...defaultProps} />);
		const pageButton = screen.getByRole("button", { name: "3" });
		fireEvent.click(pageButton);
		expect(onPageChangeMock).toHaveBeenCalledWith(2);
	});
});
