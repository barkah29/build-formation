import Container from "@/Components/Container";
// import Title from "@/Components/Title/Title";
import Layouts from "@/Layouts/Layouts";
import { Head } from "@inertiajs/inertia-react";
// import { useTable } from "react-table";
// import Table from "@/Components/Table";
// import Logo from "@Components/Logo";

export default function Home(props) {
    return (
        <>
            <Head title="Home" />
            <Layouts>
                <section>
                    <Container>{/* <Logo /> */}</Container>
                </section>
            </Layouts>
        </>
    );
}
