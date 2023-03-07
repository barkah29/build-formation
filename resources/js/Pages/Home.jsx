import Container from "@/Components/Container";
import Layouts from "@/Layouts/Layouts";
import { Head } from "@inertiajs/inertia-react";
import Logo from "@/Components/Logo";

export default function Home(props) {
    return (
        <>
            <Head title="Home" />
            <Layouts>
                <section>
                    <Container>
                        <div className="mt-[6rem] flex justify-center">
                            <Logo width={400} height={400} />
                        </div>
                    </Container>
                </section>
            </Layouts>
        </>
    );
}
