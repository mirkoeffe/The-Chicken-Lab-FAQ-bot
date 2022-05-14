export declare type Question = {
    question: string;
    answer: string;
};
export declare type FaqConfig = {
    intro: {
        title: string;
        description: string;
        titleImageUrl: string;
        titleButtons: string;
        messageButtonImage: string;
    };
    otherOption: Question;
    questions: Question[];
    numberEmojis: string[];
};
